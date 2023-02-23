import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../generated/graphql";
import { RootState } from "../store";

interface AuthState {
  isAuthenticated: boolean | null;
  access_token: string | null;
  refresh_token: string | null;
  expires_in: string | null;
  user: User | null;
  spotify_access_token: string | null | undefined;
  spotify_expires_in: string | null | undefined;
}

const initialState: AuthState = {
  isAuthenticated: null,
  access_token: null,
  refresh_token: null,
  expires_in: null,
  user: null,
  spotify_access_token: null,
  spotify_expires_in: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<AuthState>) {
      (state.isAuthenticated = action.payload.isAuthenticated),
        (state.access_token = action.payload.access_token),
        (state.refresh_token = action.payload.refresh_token),
        (state.expires_in = action.payload.expires_in),
        (state.user = action.payload.user),
        (state.spotify_access_token = action.payload.spotify_access_token),
        (state.spotify_expires_in = action.payload.spotify_expires_in);
    },
    setUser(state, action: PayloadAction<{ user: User | null }>) {
      state.user = action.payload.user;
    },
    setSpotifyAuthentication(
      state,
      action: PayloadAction<{
        spotify_access_token: string | null | undefined;
        spotify_expires_in: string | null | undefined;
      }>
    ) {
      (state.spotify_access_token = action.payload.spotify_access_token),
        (state.spotify_expires_in = action.payload.spotify_expires_in);
    },
    resetAuthentication(state) {
      (state.isAuthenticated = false),
        (state.access_token = initialState.access_token),
        (state.refresh_token = initialState.refresh_token),
        (state.expires_in = initialState.expires_in),
        (state.user = initialState.user),
        (state.spotify_access_token = initialState.spotify_access_token),
        (state.spotify_expires_in = initialState.spotify_expires_in);
    },
  },
});

export const { setAuthentication } = authSlice.actions;
export const { setUser } = authSlice.actions;
export const { setSpotifyAuthentication } = authSlice.actions;
export const { resetAuthentication } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) => state.auth.refresh_token;
export const selectExpiresIn = (state: RootState) => state.auth.expires_in;
export const selectUser = (state: RootState) => state.auth.user;
export const selectSpotifyAuthState = (state: RootState) => ({
  spotify_access_token: state.auth.spotify_access_token,
  spotify_expires_in: state.auth.spotify_expires_in,
});
export const selectUrqlAuthState = (state: RootState) => ({
  access_token: state.auth.access_token,
  refresh_token: state.auth.refresh_token,
  expires_in: state.auth.expires_in,
});

export default authSlice.reducer;
