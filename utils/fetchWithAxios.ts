import { REFRESH_TOKEN_ENDPOINT, SPOTIFY_TOKEN_ENDPOINT } from "@env";
import axiosRetry from "axios-retry";
import axios, { AxiosError } from "axios";
import { User } from "../generated/graphql";

axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => {
    return true;
  },
  retryDelay: axiosRetry.exponentialDelay,
  onRetry: (retryCount) => {
    console.log("retry: ", retryCount);
  },
});

export interface FetchError {
  error: string;
}

interface RefreshTokenResponse {
  ok: boolean;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
  spotify_access_token: string | null;
  spotify_expires_in: number | null;
}

interface SpotifyTokenResponse {
  ok: boolean;
  spotify_access_token: string | null;
  spotify_expires_in: number | null;
}

export const fetchRefreshToken = async (token: string) => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      REFRESH_TOKEN_ENDPOINT,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<FetchError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { error: "Failed to Refresh Token" };
  }
};

export const fetchSpotifyToken = async () => {
  try {
    const response = await axios.get<SpotifyTokenResponse>(SPOTIFY_TOKEN_ENDPOINT, {
      "axios-retry": {
        retries: 0,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<FetchError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { error: "Failed to Connect to Spotify" };
  }
};
