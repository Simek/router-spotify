import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { TabBarButton } from "@/components/tabs/TabBarButton";
import { TabBarIcon } from "@/components/tabs/TabBarIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
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
        name="index"
        options={{
          title: "Home",
          tabBarLabelStyle: {
            marginBottom: -4,
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
            marginBottom: -4,
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
            marginBottom: -4,
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
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
