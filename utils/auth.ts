import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  refreshAsync,
} from "expo-auth-session";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const authRequestConfig = {
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
  scopes: [
    "user-follow-read",
    "user-library-read",
    "user-read-email",
    "user-follow-read",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
  ],
  usePKCE: false,
  redirectUri: makeRedirectUri({
    scheme: "dev.simek.routerspotify",
    native: "routerspotify://",
    preferLocalhost: true,
  }),
};

export const authDiscovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

type AuthStore = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authToken: null,
      refreshToken: null,
      setAuthToken: (token) => set(() => ({ authToken: token })),
      setRefreshToken: (token) => set(() => ({ refreshToken: token })),
    }),
    {
      name: "user-auth-token",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function exchangeAuthCodeAsync(code: string) {
  return exchangeCodeAsync(
    {
      code,
      clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
      redirectUri: authRequestConfig.redirectUri,
    },
    authDiscovery,
  );
}

export function refreshTokenAsync(refreshToken: string) {
  return refreshAsync(
    {
      refreshToken,
      clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
    },
    authDiscovery,
  );
}
