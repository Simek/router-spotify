import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { Platform } from "react-native";

import { PlayerSheet } from "@/components/PlayerSheet";
import { TabBarButton } from "@/components/navigation/TabBarButton";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <Fragment>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            position: "absolute",
            bottom: pathname.startsWith("/search/genre") ? -80 : 0,
            minHeight: Platform.select({ web: 60 }),
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
                className="absolute inset-0 w-full h-full"
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
            tabBarLabelStyle: {
              marginHorizontal: 0,
              marginTop: Platform.select({ web: 2, default: 0 }),
              fontFamily: "GothamMedium",
              userSelect: "none",
            },
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
            tabBarLabelStyle: {
              marginHorizontal: 0,
              marginTop: Platform.select({ web: 2, default: 0 }),
              fontFamily: "GothamMedium",
              userSelect: "none",
            },
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
            tabBarLabelStyle: {
              marginHorizontal: 0,
              marginTop: Platform.select({ web: 2, default: 0 }),
              fontFamily: "GothamMedium",
              userSelect: "none",
            },
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
    </Fragment>
  );
}
