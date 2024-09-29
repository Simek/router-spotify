import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAuthRequest, type TokenResponse } from "expo-auth-session";
import { useFonts } from "expo-font";
import { useGlobalSearchParams } from "expo-router";
import { Drawer } from "expo-router/drawer";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useEffect } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DrawerContent } from "@/components/navigation/DrawerContent";
import { User } from "@/types/spotify";
import {
  authDiscovery,
  authRequestConfig,
  exchangeAuthCodeAsync,
  refreshTokenAsync,
  useAuthStore,
} from "@/utils/auth";
import { fetchAPI } from "@/utils/fetch";
import { useUserStore } from "@/utils/user";

import "expo-dev-client";

import "../global.css";

SplashScreen.preventAutoHideAsync().catch(console.error);
SystemUI.setBackgroundColorAsync("#000000").catch(console.error);

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { code } = useGlobalSearchParams();
  const {
    setAuthToken,
    authToken,
    setRefreshToken,
    refreshToken,
    setExpireDate,
    expireDate,
  } = useAuthStore();
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

  function handleAuth(token: TokenResponse) {
    setAuthToken(token.accessToken);
    setRefreshToken(token.refreshToken ?? null);
    setExpireDate(Date.now() + (token.expiresIn ?? 3600) * 1000);
  }

  useEffect(() => {
    if (refreshToken && expireDate && expireDate < Date.now() - 60_000) {
      refreshTokenAsync(refreshToken).catch(console.error);
    }
  }, [expireDate]);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      exchangeAuthCodeAsync(code).then(handleAuth);
    } else if (code) {
      exchangeAuthCodeAsync(code.toString()).then(handleAuth);
      maybeCompleteAuthSession();
    }
  }, [response, code]);

  useEffect(() => {
    if (authToken && !user) {
      fetchAPI("me", authToken, (data: User) => setUser(data)).catch(
        console.error,
      );
    }
  }, [authToken]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(console.error);
    }
  }, [loaded]);

  if (!loaded) {
    return <View className="flex flex-1 bg-black" />;
  }

  return (
    <GestureHandlerRootView className="flex flex-1 bg-black">
      <StatusBar style="light" />
      <Head>
        <title>Router Spotify</title>
      </Head>
      {authToken ? (
        <BottomSheetModalProvider>
          <Drawer
            drawerContent={() => <DrawerContent />}
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                backgroundColor: "#101010",
              },
            }}
          >
            <Drawer.Screen name="(tabs)" />
          </Drawer>
        </BottomSheetModalProvider>
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
    </GestureHandlerRootView>
  );
}
