import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { View } from "react-native";

import { DrawerContent } from "@/components/navigation/DrawerContent";

import "expo-dev-client";

import "../global.css";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#000000");

export const unstable_settings = {
  initialRouteName: "/(tabs)/home",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    GothamLight: require("../assets/fonts/Gotham-Light.otf"),
    GothamMedium: require("../assets/fonts/Gotham-Medium.otf"),
    GothamBold: require("../assets/fonts/Gotham-Bold.otf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className="flex flex-1 bg-black">
      <StatusBar style="light" />
      <Drawer
        drawerContent={() => <DrawerContent />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </View>
  );
}
