import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { PlayerSheet } from "@/components/PlayerSheet";
import { TabBarButton } from "@/components/navigation/TabBarButton";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        initialRouteName="index"
        sceneContainerStyle={{
          backgroundColor: "#000",
        }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            position: "absolute",
            bottom: pathname.startsWith("/search/genre") ? -80 : 0,
            minHeight: Platform.select({ web: 64 }),
          },
          tabBarLabelStyle: {
            marginBottom: Platform.select({ web: 0, default: -4 }),
            marginTop: Platform.select({ web: 16, default: 0 }),
            marginLeft: Platform.select({ web: 0 }),
            fontFamily: "GothamMedium",
            userSelect: "none",
          },
          tabBarActiveTintColor: "#fff",
          headerShown: false,
          tabBarBackground: () => (
            <BlurView
              intensity={12}
              tint="dark"
              experimentalBlurMethod="dimezisBlurView"
              className="absolute inset-0 w-full h-full"
            >
              <LinearGradient
                // NOTE: NW classes does not work here
                // className="absolute inset-0 w-full h-full"
                style={StyleSheet.absoluteFill}
                colors={["#000c", "#000"]}
                locations={[0, 0.75]}
              />
            </BlurView>
          ),
        }}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            title: "Home",
            tabBarButton: (props) => <TabBarButton {...props} />,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarButton: (props) => <TabBarButton {...props} />,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "search" : "search-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Your Library",
            tabBarButton: (props) => <TabBarButton {...props} />,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "library" : "library-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <PlayerSheet />
    </>
  );
}
