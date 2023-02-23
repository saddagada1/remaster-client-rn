import * as SecureStore from "expo-secure-store";
import { User } from "../generated/graphql";
import { calcExpiresIn } from "./calc";
import {
  ACCESS_TOKEN_KEY,
  EXPIRES_IN_KEY,
  REFRESH_TOKEN_KEY,
  SPOTIFY_ACCESS_TOKEN_KEY,
  SPOTIFY_EXPIRES_IN_KEY,
  USER_KEY,
} from "./constants";

interface authKeysInput {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
  spotify_access_token: string | null | undefined;
  spotify_expires_in: number | null | undefined;
}

interface spotifyKeysInput {
  spotify_access_token: string | null | undefined;
  spotify_expires_in: number | null | undefined;
}

interface authKeysOutput {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  user: User;
  spotify_access_token: string | null | undefined;
  spotify_expires_in: string | null | undefined;
}

interface spotifyKeysOutput {
  spotify_access_token: string;
  spotify_expires_in: string;
}

export const setAuthKeys = async ({
  access_token,
  refresh_token,
  expires_in,
  user,
  spotify_access_token,
  spotify_expires_in,
}: authKeysInput) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
  await SecureStore.setItemAsync(EXPIRES_IN_KEY, calcExpiresIn(expires_in));
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  if (spotify_access_token && spotify_expires_in) {
    await SecureStore.setItemAsync(SPOTIFY_ACCESS_TOKEN_KEY, spotify_access_token);
    await SecureStore.setItemAsync(SPOTIFY_EXPIRES_IN_KEY, calcExpiresIn(spotify_expires_in));
  }
};

export const setUserKey = async (user: User) => {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

export const setSpotifyKeys = async ({
  spotify_access_token,
  spotify_expires_in,
}: spotifyKeysInput) => {
  if (spotify_access_token && spotify_expires_in) {
    await SecureStore.setItemAsync(SPOTIFY_ACCESS_TOKEN_KEY, spotify_access_token);
    await SecureStore.setItemAsync(SPOTIFY_EXPIRES_IN_KEY, calcExpiresIn(spotify_expires_in));
  }
};

export const getAuthKeys = async (): Promise<authKeysOutput | null> => {
  const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  const refresh_token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  const expires_in = await SecureStore.getItemAsync(EXPIRES_IN_KEY);
  const stored_user = await SecureStore.getItemAsync(USER_KEY);
  const spotify_access_token = await SecureStore.getItemAsync(SPOTIFY_ACCESS_TOKEN_KEY);
  const spotify_expires_in = await SecureStore.getItemAsync(SPOTIFY_EXPIRES_IN_KEY);
  if (access_token && refresh_token && expires_in && stored_user) {
    return {
      access_token,
      refresh_token,
      expires_in,
      user: JSON.parse(stored_user),
      spotify_access_token: spotify_access_token ? spotify_access_token : null,
      spotify_expires_in: spotify_expires_in ? spotify_expires_in : null,
    };
  } else {
    return null;
  }
};

export const getUserKey = async (): Promise<User | null> => {
  const stored_user = await SecureStore.getItemAsync(USER_KEY);
  if (stored_user) {
    return JSON.parse(stored_user);
  } else {
    return null;
  }
};

export const getSpotifyKeys = async (): Promise<spotifyKeysOutput | null> => {
  const spotify_access_token = await SecureStore.getItemAsync(SPOTIFY_ACCESS_TOKEN_KEY);
  const spotify_expires_in = await SecureStore.getItemAsync(SPOTIFY_EXPIRES_IN_KEY);
  if (spotify_access_token && spotify_expires_in) {
    return {
      spotify_access_token,
      spotify_expires_in,
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
  await SecureStore.deleteItemAsync(SPOTIFY_ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(SPOTIFY_EXPIRES_IN_KEY);
};
