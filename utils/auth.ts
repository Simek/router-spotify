import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const authRequestConfig = {
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
  scopes: [
    "user-follow-read",
    "user-library-read",
    "user-read-email",
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
  }),
};

export const authDiscovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

type AuthStore = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authToken: null,
      setAuthToken: (token) => set(() => ({ authToken: token })),
    }),
    {
      name: "user-auth-token",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
