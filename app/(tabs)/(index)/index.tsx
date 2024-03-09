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
import { TopTrackTile } from "@/components/navigation/TopTrackTile";
import type { Artist, TopArtists, TopTracks } from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";
import { fetchAPI } from "@/utils/fetch";

type HomeLists = "all" | "music" | "podcasts";

export default function HomeScreen() {
  const { authToken } = useAuthStore();

  const [activeList, setActiveList] = useState<HomeLists>("all");
  const [userTopTracks, setUserTopTracks] = useState<TopTracks | null>(null);
  const [userTopArtists, setUserTopArtists] = useState<TopArtists | null>(null);

  useEffect(() => {
    fetchAPI(
      "me/top/tracks?time_range=long_term&limit=8&offset=0",
      authToken,
      setUserTopTracks,
    );
  }, []);

  useEffect(() => {
    fetchAPI(
      "me/top/artists?time_range=short_term&limit=8&offset=0",
      authToken,
      setUserTopArtists,
    );
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
            <ScrollView horizontal contentContainerClassName="px-4 gap-4">
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
                scrollEnabled={false}
                columnWrapperClassName="flex gap-3"
                contentContainerClassName="px-4 gap-3"
                data={userTopTracks?.items}
                renderItem={TopTrackTile}
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
