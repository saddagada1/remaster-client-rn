import * as SecureStore from "expo-secure-store";
import { User } from "../generated/graphql";
import { calcExpiresIn } from "./calcExpiresIn";
import {
  ACCESS_TOKEN_KEY,
  EXPIRES_IN_KEY,
  REFRESH_TOKEN_KEY,
  USER_KEY,
} from "./constants";

interface authKeysInput {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
}

interface authKeysOutput {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  user: User;
}

export const setAuthKeys = async ({
  access_token,
  refresh_token,
  expires_in,
  user,
}: authKeysInput) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
  await SecureStore.setItemAsync(EXPIRES_IN_KEY, calcExpiresIn(expires_in));
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

export const setUserKey = async (user: User) => {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

export const getAuthKeys = async (): Promise<authKeysOutput | null> => {
  const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  const refresh_token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  const expires_in = await SecureStore.getItemAsync(EXPIRES_IN_KEY);
  const stored_user = await SecureStore.getItemAsync(USER_KEY);
  if (access_token && refresh_token && expires_in && stored_user) {
    return {
      access_token,
      refresh_token,
      expires_in,
      user: JSON.parse(stored_user),
    };
  } else {
    return null;
  }
};

export const delAuthKeys = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(EXPIRES_IN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
};
