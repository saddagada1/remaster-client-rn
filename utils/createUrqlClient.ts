import { GRAPHQL_SERVER_URL } from "@env";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  AnyVariables,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Operation,
} from "urql";
import { AuthNavigator } from "../components/Navigators/RootStackNavigator";
import {
  resetAuthentication,
  selectUrqlAuthState,
  setAuthentication,
} from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { calcExpiresIn, calcIsExpiring } from "./calc";
import { delAuthKeys, setAuthKeys } from "./secureStore";
import { fetchRefreshToken } from "./fetchWithAxios";
import { toBase64String } from "./toBase64String";

interface UrqlAuthState {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

const isGoogleOp = (operation: Operation<any, AnyVariables>) => {
  const googleRegex = /google/i;
  return operation.query.definitions.some((definition) => {
    return (
      definition.kind === "OperationDefinition" &&
      definition.selectionSet.selections.some((node) => {
        return node.kind === "Field" && googleRegex.test(node.name.value);
      })
    );
  });
};

const isSpotifyOp = (operation: Operation<any, AnyVariables>) => {
  const spotifyRegex = /spotify/i;
  return operation.query.definitions.some((definition) => {
    return (
      definition.kind === "OperationDefinition" &&
      definition.selectionSet.selections.some((node) => {
        return node.kind === "Field" && spotifyRegex.test(node.name.value);
      })
    );
  });
};

const getAuth: AuthConfig<UrqlAuthState>["getAuth"] = async ({ authState }) => {
  console.log("get auth attempt");
  const state = store.getState();
  if (!authState) {
    console.log("setting auth state");
    const values = selectUrqlAuthState(state);
    if (values.access_token && values.refresh_token && values.expires_in) {
      console.log("auth state set");
      console.log(toBase64String(values.access_token));
      return {
        access_token: values.access_token,
        refresh_token: values.refresh_token,
        expires_in: values.expires_in,
      };
    } else {
      console.log("auth not set");
      return null;
    }
  }

  console.log("refreshing token");
  const base64RefreshToken = toBase64String(authState.refresh_token);
  const data = await fetchRefreshToken(base64RefreshToken);

  if ("error" in data) {
    console.log("forced log out");
    await delAuthKeys();
    store.dispatch(resetAuthentication());
    AuthNavigator("Auth", { screen: "Onboarding" }, "replace");
    return null;
  }

  console.log("refreshed token");
  await setAuthKeys({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    user: data.user,
    spotify_access_token: data.spotify_access_token,
    spotify_expires_in: data.spotify_expires_in,
  });
  store.dispatch(
    setAuthentication({
      isAuthenticated: true,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: calcExpiresIn(data.expires_in),
      user: data.user,
      spotify_access_token: data.spotify_access_token,
      spotify_expires_in: data.spotify_expires_in ? calcExpiresIn(data.spotify_expires_in) : null,
    })
  );
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: calcExpiresIn(data.expires_in),
  };
};

const addAuthToOperation: AuthConfig<UrqlAuthState>["addAuthToOperation"] = ({
  authState,
  operation,
}) => {
  if (!authState || !authState.access_token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  const base64AccessToken = toBase64String(authState.access_token);

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers:
        isGoogleOp(operation) || isSpotifyOp(operation)
          ? { ...fetchOptions.headers }
          : {
              ...fetchOptions.headers,
              Authorization: `Bearer ${base64AccessToken}`,
            },
    },
  });
};

const willAuthError: AuthConfig<UrqlAuthState>["willAuthError"] = ({ operation, authState }) => {
  if (!authState) {
    return !(
      operation.kind === "mutation" &&
      operation.query.definitions.some((definition) => {
        return (
          definition.kind === "OperationDefinition" &&
          definition.selectionSet.selections.some((node) => {
            return (
              node.kind === "Field" &&
              (node.name.value === "login" ||
                node.name.value === "register" ||
                node.name.value === "loginWithGoogle" ||
                node.name.value === "registerWithGoogle" ||
                node.name.value === "loginWithGuestAccess" ||
                node.name.value === "forgotPassword" ||
                node.name.value === "changeForgotPassword")
            );
          })
        );
      })
    );
  } else {
    const isExpiring = calcIsExpiring(authState.expires_in);
    console.log("token check");
    console.log(isExpiring ? "token expired" : "token good");
    return isExpiring;
  }
};

const didAuthError: AuthConfig<UrqlAuthState>["didAuthError"] = ({ error }) => {
  console.log(
    "auth error: ",
    error.graphQLErrors.some((e) => e.message === "Not Authenticated")
  );
  console.log(error);
  return error.graphQLErrors.some((e) => e.message === "Not Authenticated");
};

export const createUrqlClient = (isAuth: boolean | null) => {
  if (isAuth === null) {
    return createClient({
      url: GRAPHQL_SERVER_URL,
    });
  } else {
    return createClient({
      url: GRAPHQL_SERVER_URL,
      exchanges: [
        dedupExchange,
        cacheExchange(),
        authExchange({
          getAuth,
          addAuthToOperation,
          willAuthError,
          didAuthError,
        }),
        fetchExchange,
      ],
    });
  }
};
