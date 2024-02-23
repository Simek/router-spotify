import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { Pill } from "@/components/Pill";
import { TabHeader } from "@/components/navigation/TabHeader";

type LibraryFilters =
  | "none"
  | "playlists"
  | "albums"
  | "artists"
  | "downloaded";

export default function LibraryScreen() {
  const [activeFilter, setActiveFilter] = useState<LibraryFilters>("none");

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <TabHeader
              leftSlot="Your Library"
              rightSlot={<Ionicons size={30} name="add" color="#fff" />}
              bottomSlot={
                <View className="flex flex-row gap-2 px-4">
                  {activeFilter === "none" ? (
                    <>
                      <Pressable onPress={() => setActiveFilter("playlists")}>
                        <Pill content="Playlists" />
                      </Pressable>
                      <Pressable onPress={() => setActiveFilter("albums")}>
                        <Pill content="Albums" />
                      </Pressable>
                      <Pressable onPress={() => setActiveFilter("artists")}>
                        <Pill content="Artists" />
                      </Pressable>
                      <Pressable onPress={() => setActiveFilter("downloaded")}>
                        <Pill content="Downloaded" />
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Pressable onPress={() => setActiveFilter("none")}>
                        <Pill
                          content={
                            <Ionicons
                              name="close-outline"
                              size={20}
                              color="#fff"
                            />
                          }
                          className="px-1.5"
                        />
                      </Pressable>
                      <Pill
                        content={
                          activeFilter.charAt(0).toUpperCase() +
                          activeFilter.slice(1)
                        }
                        isActive
                      />
                    </>
                  )}
                </View>
              }
            />
          ),
        }}
      />
      <Text className="text-white font-default">Library</Text>
    </View>
  );
}
