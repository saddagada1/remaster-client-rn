import { GRAPHQL_SERVER_URL, REFRESH_TOKEN_ENDPOINT } from "@env";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import axios from "axios";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
} from "urql";
import { AuthNavigator } from "../components/Navigators/RootStackNavigator";
import {
  selectUrqlAuthState,
  setAuthentication,
} from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { calcExpiresIn } from "./calcExpiresIn";
import { delAuthKeys, setAuthKeys } from "./secureStore";

interface UrqlAuthState {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

const getAuth: AuthConfig<UrqlAuthState>["getAuth"] = async ({ authState }) => {
  console.log("get auth attempt");
  const state = store.getState();
  if (!authState) {
    console.log("setting auth state");
    const values = selectUrqlAuthState(state);
    if (values.access_token && values.refresh_token && values.expires_in) {
      console.log("auth state set");
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
  const response = await axios.post(
    REFRESH_TOKEN_ENDPOINT,
    {},
    { headers: { Authorization: `Bearer ${authState.access_token}` } }
  );

  if (response.data?.ok) {
    console.log("refreshed token");
    await setAuthKeys({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_in: response.data.expires_in,
      user: response.data.user,
    });
    store.dispatch(
      setAuthentication({
        isAuthenticated: true,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: calcExpiresIn(response.data.expires_in),
        user: response.data.user,
      })
    );
    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_in: calcExpiresIn(response.data.expires_in),
    };
  }

  console.log("forced log out");
  await delAuthKeys();
  store.dispatch(
    setAuthentication({
      isAuthenticated: false,
      access_token: null,
      refresh_token: null,
      expires_in: null,
      user: null,
    })
  );
  AuthNavigator("Auth", { screen: "Onboarding" }, "replace");
  return null;
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

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.access_token}`,
      },
    },
  });
};

const willAuthError: AuthConfig<UrqlAuthState>["willAuthError"] = ({
  operation,
  authState,
}) => {
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
                node.name.value === "forgotPassword" ||
                node.name.value === "changeForgotPassword")
            );
          })
        );
      })
    );
  } else {
    const now = new Date();
    const isExpiring = Date.parse(authState.expires_in) - now.getTime() <= 5000;
    console.log("token check");
    console.log(isExpiring ? "token expired" : null);
    return isExpiring;
  }
};

const didAuthError: AuthConfig<UrqlAuthState>["didAuthError"] = ({ error }) => {
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
