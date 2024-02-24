import {
  exchangeCodeAsync,
  useAuthRequest,
  type TokenResponse,
} from "expo-auth-session";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import { DrawerContent } from "@/components/navigation/DrawerContent";
import { authDiscovery, authRequestConfig, useAuthStore } from "@/utils/auth";
import { useUserStore } from "@/utils/user";

import "expo-dev-client";

import "../global.css";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#000000");

export const unstable_settings = {
  initialRouteName: "/(tabs)/home",
};

const SKIP_AUTH = false;

export default function RootLayout() {
  const { setAuthToken, authToken } = useAuthStore();
  const { user, setUser } = useUserStore();

  const [loaded, error] = useFonts({
    GothamLight: require("../assets/fonts/Gotham-Light.otf"),
    GothamMedium: require("../assets/fonts/Gotham-Medium.otf"),
    GothamBold: require("../assets/fonts/Gotham-Bold.otf"),
  });

  const [request, response, promptAsync] = useAuthRequest(
    authRequestConfig,
    authDiscovery,
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      exchangeCodeAsync(
        {
          code,
          clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
          clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
          redirectUri: authRequestConfig.redirectUri,
        },
        authDiscovery,
      ).then((token: TokenResponse) => setAuthToken(token.accessToken));
    }
  }, [response]);

  useEffect(() => {
    if (authToken && !user) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    }
  }, [authToken]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <View className="flex flex-1 bg-black" />;
  }

  return (
    <View className="flex flex-1 bg-black">
      <StatusBar style="light" />
      {SKIP_AUTH || authToken ? (
        <Drawer
          drawerContent={() => <DrawerContent />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="(tabs)" />
        </Drawer>
      ) : (
        <SafeAreaView className="flex flex-1 items-center justify-center">
          <Pressable
            className="bg-emerald-500 rounded-full py-2 px-5 items-center min-w-[33vw]"
            disabled={!request}
            onPress={() => promptAsync()}
          >
            <Text className="font-default text-lg">Login</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </View>
  );
}
