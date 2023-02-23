import axios, { AxiosError } from "axios";
import { selectSpotifyAuthState, setSpotifyAuthentication } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { calcExpiresIn, calcIsExpiring } from "./calc";
import { FetchError, fetchSpotifyToken } from "./fetchWithAxios";
import { setSpotifyKeys } from "./secureStore";
import { sleep } from "./sleep";
import { SearchResponse } from "./types/spotify";

const spotifyAuthState = selectSpotifyAuthState(store.getState());
let spotify_access_token = spotifyAuthState.spotify_access_token;
let spotify_expires_in = spotifyAuthState.spotify_expires_in;
store.subscribe(() => {
  const spotifyAuthState = selectSpotifyAuthState(store.getState());
  spotify_access_token = spotifyAuthState.spotify_access_token;
  spotify_expires_in = spotifyAuthState.spotify_expires_in;
});

const spotifyClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchSpotify = async (query: string) => {
  await sleep(2000);
  try {
    const response = await spotifyClient.get<SearchResponse>(
      `/search?q=${query}&type=track,album,artist&limit=50`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<FetchError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { error: "Failed to search Spotify" };
  }
};

const getSpotifyToken = async () => {
  const data = await fetchSpotifyToken();
  if ("error" in data) {
    return false;
  }
  await setSpotifyKeys({
    spotify_access_token: data.spotify_access_token,
    spotify_expires_in: data.spotify_expires_in,
  });
  store.dispatch(
    setSpotifyAuthentication({
      spotify_access_token: data.spotify_access_token,
      spotify_expires_in: data.spotify_expires_in ? calcExpiresIn(data.spotify_expires_in) : null,
    })
  );
  return true;
};

spotifyClient.interceptors.request.use(
  async (config) => {
    if (!spotify_access_token || !spotify_expires_in || calcIsExpiring(spotify_expires_in)) {
      console.log("spotify auth not found or is expiring");
      const response = await getSpotifyToken();
      if (response) {
        console.log("spotify auth set");
        config.headers.Authorization = `Bearer ${spotify_access_token}`;
      } else {
        throw "Could Not Authenticate with Spotify";
      }
    } else {
      console.log("spotify auth found");
      config.headers.Authorization = `Bearer ${spotify_access_token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

spotifyClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 400 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      console.log("spotify auth error");
      originalRequest._retry = true;
      const response = await getSpotifyToken();
      if (response) {
        console.log("spotify auth error retry");
        originalRequest.headers.Authorization = `Bearer ${spotify_access_token}`;
        return spotifyClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
