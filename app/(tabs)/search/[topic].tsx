import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { twMerge } from "tailwind-merge";

import searchTopics from "@/assets/data/searchTopics.json";
import type { SearchAlbums, SearchPlaylist } from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";
import { fetchAPI } from "@/utils/fetch";

export default function TopicScreen() {
  const { authToken } = useAuthStore();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [topPlaylists, setTopPlaylist] = useState<SearchPlaylist | null>(null);
  const [topAlbums, setTopAlbums] = useState<SearchAlbums | null>(null);

  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const topic =
    searchTopics && searchTopics.find((topic) => topic.id === topicId);

  useEffect(() => {
    fetchAPI(
      `search?q=${topicId}%2520genre&type=playlist&limit=16`,
      authToken,
      setTopPlaylist,
    );
  }, []);

  useEffect(() => {
    fetchAPI(
      `search?q=${topicId}%2520genre&type=album&limit=16`,
      authToken,
      setTopAlbums,
    );
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black w-screen">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <SafeAreaView className="web:py-4">
              <Pressable onPress={() => router.navigate("/search")}>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    className={twMerge(
                      "px-2 mb-2",
                      pressed && "text-opacity-80",
                    )}
                    size={24}
                    color="#fff"
                  />
                )}
              </Pressable>
            </SafeAreaView>
          ),
        }}
      />
      <ScrollView
        className={twMerge("pt-40 -mt-40 w-screen", topic?.color)}
        bounces={false}
      >
        <View className="flex-grow-0">
          <View className="px-4 pb-3">
            <Text className="font-bold text-3xl text-white">{topic?.text}</Text>
          </View>
          <Text className="text-white text-xl font-bold p-4 pb-1 mt-4">
            Top playlists
          </Text>
          <FlatList
            horizontal
            data={topPlaylists?.playlists?.items}
            contentContainerClassName="px-4 py-2 gap-4 h-64"
            renderItem={({ item }) => (
              <View className="gap-2">
                <Image
                  source={{
                    uri: item.images[0].url,
                  }}
                  className="size-48"
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  className="font-default text-sm text-white w-48"
                >
                  {item.name}
                </Text>
              </View>
            )}
          />
          <Text className="text-white text-xl font-bold p-4 pb-1">
            Top albums
          </Text>
          <FlatList
            horizontal
            data={topAlbums?.albums?.items}
            contentContainerClassName="px-4 py-2 gap-4"
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 90,
            }}
            renderItem={({ item }) => (
              <View className="gap-2">
                <Image
                  source={{
                    uri: item.images[0].url,
                  }}
                  className="size-48"
                />
                <View>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="font-default text-sm text-white w-48"
                  >
                    {item.name}
                  </Text>
                  <Text className="font-default text-sm text-gray-300 w-48">
                    {item.artists[0].name}
                  </Text>
                </View>
              </View>
            )}
          />
          <View className="-z-10 absolute h-screen w-screen">
            <LinearGradient
              style={[StyleSheet.absoluteFill, { top: -60 }]}
              colors={["transparent", "#000"]}
              locations={[0, 0.1]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
