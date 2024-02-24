import { Image } from "expo-image";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";

import { Pill } from "@/components/Pill";
import { TabHeader } from "@/components/navigation/TabHeader";
import type { Artist, TopArtists, TopTracks, Track } from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";

type HomeLists = "all" | "music" | "podcasts";

export default function HomeScreen() {
  const { authToken } = useAuthStore();

  const [activeList, setActiveList] = useState<HomeLists>("all");
  const [userTopTracks, setUserTopTracks] = useState<TopTracks | null>(null);
  const [userTopArtists, setUserTopArtists] = useState<TopArtists | null>(null);

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=8&offset=0",
      { headers: { Authorization: `Bearer ${authToken}` } },
    )
      .then((response) => response.json())
      .then((data) => {
        setUserTopTracks(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=8&offset=0",
      { headers: { Authorization: `Bearer ${authToken}` } },
    )
      .then((response) => response.json())
      .then((data) => {
        setUserTopArtists(data);
      });
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <StatusBar style="light" />
      <Head>
        <title>Router Spotify &mdash; Search</title>
      </Head>
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
        <View className="flex flex-1 py-4 w-full">
          <Text className="text-white text-xl font-bold p-4">
            Favourite artist
          </Text>
          <View className="flex h-44">
            <ScrollView horizontal contentContainerClassName="px-4 gap-3">
              {userTopArtists?.items &&
                userTopArtists.items.map((item: Artist) => (
                  <View key={item.id} className="flex gap-2 items-center">
                    <View className="size-32 bg-[#111] rounded-full inline-flex overflow-hidden">
                      <Image
                        source={item.images[0].url}
                        style={StyleSheet.absoluteFill}
                      />
                    </View>
                    <Text className="text-white font-default">{item.name}</Text>
                  </View>
                ))}
            </ScrollView>
          </View>
          <View className="flex flex-1">
            <Text className="text-white text-xl font-bold p-4">Top tracks</Text>
            {userTopTracks?.items && (
              <FlatList
                numColumns={2}
                columnWrapperClassName="flex gap-3"
                contentContainerClassName="px-4 gap-3"
                data={userTopTracks?.items}
                renderItem={({ item }: { item: Track }) => (
                  <View
                    key={item.id}
                    className="flex flex-row gap-2 items-center rounded-md bg-[#111] w-[46vw] pr-2"
                  >
                    <View className="size-16 bg-[#222] rounded-l-md inline-flex overflow-hidden">
                      <Image
                        source={item.album.images[0].url}
                        style={StyleSheet.absoluteFill}
                      />
                    </View>
                    <Text
                      className="w-[30vw] text-white text-sm font-default px-2 break-words"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
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
