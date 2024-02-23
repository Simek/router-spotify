import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { Pill } from "@/components/Pill";
import { TabHeader } from "@/components/navigation/TabHeader";

type HomeLists = "all" | "music" | "podcasts";

export default function HomeScreen() {
  const [activeList, setActiveList] = useState<HomeLists>("all");

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <TabHeader
              leftSlot={
                <View className="flex flex-row gap-2">
                  <Pressable onPress={() => setActiveList("all")}>
                    <Pill content="All" isActive={activeList === "all"} />
                  </Pressable>
                  <Pressable onPress={() => setActiveList("music")}>
                    <Pill content="Music" isActive={activeList === "music"} />
                  </Pressable>
                  <Pressable onPress={() => setActiveList("podcasts")}>
                    <Pill
                      content="Podcasts"
                      isActive={activeList === "podcasts"}
                    />
                  </Pressable>
                </View>
              }
            />
          ),
        }}
      />
      {activeList === "all" && (
        <Text className="text-white font-default">Home: All</Text>
      )}
      {activeList === "music" && (
        <Text className="text-white font-default">Home: Music</Text>
      )}
      {activeList === "podcasts" && (
        <Text className="text-white font-default">Home: Podcasts</Text>
      )}
    </View>
  );
}
