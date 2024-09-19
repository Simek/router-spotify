import { Stack } from "expo-router";
import Head from "expo-router/head";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";

import { ArtistTile } from "@/components/ArtistTile";
import { Pill } from "@/components/Pill";
import { RecommendedAlbumTile } from "@/components/RecommendedAlbumTile";
import { TopTrackTile } from "@/components/TopTrackTile";
import { TabHeader } from "@/components/navigation/TabHeader";
import {
  Artist,
  ListResponse,
  TopArtists,
  TopTracks,
  Track,
} from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";
import { fetchAPI } from "@/utils/fetch";
import { getSeedArtistsIds } from "@/utils/helpers";

type HomeLists = "all" | "music" | "podcasts";

const PER_PAGE = Platform.select({ web: 16, default: 8 });

export default function HomeScreen() {
  const { authToken } = useAuthStore();

  const [activeList, setActiveList] = useState<HomeLists>("all");
  const [userTopTracks, setUserTopTracks] = useState<TopTracks | null>(null);
  const [userTopArtists, setUserTopArtists] = useState<TopArtists | null>(null);
  const [userFollowedArtists, setUserFollowedArtists] = useState<{
    artists: ListResponse<Artist>;
  } | null>(null);
  const [userRecommendedTracks, setUserRecommendedTracks] = useState<{
    tracks: Track[];
  } | null>(null);

  useEffect(() => {
    fetchAPI(
      `me/top/tracks?time_range=long_term&limit=${PER_PAGE}&offset=0`,
      authToken,
      setUserTopTracks,
    ).catch(console.error);
  }, []);

  useEffect(() => {
    fetchAPI(
      `me/top/artists?time_range=short_term&limit=${PER_PAGE}&offset=0`,
      authToken,
      setUserTopArtists,
    ).catch(console.error);
  }, []);

  useEffect(() => {
    fetchAPI(
      `me/following?type=artist&limit=${PER_PAGE}`,
      authToken,
      setUserFollowedArtists,
    ).catch(console.error);
  }, []);

  useEffect(() => {
    if (userTopArtists) {
      fetchAPI(
        `recommendations?seed_artists=${getSeedArtistsIds(userTopArtists)}&limit=${PER_PAGE}`,
        authToken,
        setUserRecommendedTracks,
      ).catch(console.error);
    }
  }, [userTopArtists]);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <StatusBar style="light" />
      <Head>
        <title>Router Spotify &mdash; Home</title>
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
        <ScrollView className="flex flex-1 py-4 w-full web:pt-0 web:pb-40">
          <Text className="text-white text-xl font-bold p-4">
            Favourite artists
          </Text>
          <View className="flex h-44">
            <ScrollView horizontal contentContainerClassName="px-4 gap-4">
              {userTopArtists?.items &&
                userTopArtists.items.map((item: Artist) => (
                  <ArtistTile item={item} key={`top-artist-${item.id}`} />
                ))}
            </ScrollView>
          </View>
          <View className="flex flex-1 mb-4 web:min-h-[360px]">
            <Text className="text-white text-xl font-bold p-4">Top tracks</Text>
            {userTopTracks?.items && (
              <FlatList
                numColumns={Platform.select({
                  web: 4,
                  default: 2,
                })}
                scrollEnabled={false}
                columnWrapperClassName="flex gap-3"
                contentContainerClassName="mx-auto gap-3"
                data={userTopTracks?.items}
                renderItem={({ item }) => <TopTrackTile item={item} />}
              />
            )}
          </View>
          <View className="flex flex-1 mb-4">
            <Text className="text-white text-xl font-bold p-4">
              Recommended albums
            </Text>
            {userRecommendedTracks?.tracks && (
              <FlatList
                horizontal
                data={userRecommendedTracks?.tracks}
                contentContainerClassName="px-4 py-2 gap-4"
                viewabilityConfig={{
                  viewAreaCoveragePercentThreshold: 90,
                }}
                renderItem={({ item }) => (
                  <RecommendedAlbumTile item={item.album} uri={item.uri} />
                )}
              />
            )}
          </View>
          <Text className="text-white text-xl font-bold p-4">
            Followed artists
          </Text>
          <View className="flex h-44">
            <ScrollView horizontal contentContainerClassName="px-4 gap-4">
              {userFollowedArtists?.artists?.items &&
                userFollowedArtists?.artists?.items.map((item: Artist) => (
                  <ArtistTile item={item} key={`followed-artist-${item.id}`} />
                ))}
            </ScrollView>
          </View>
        </ScrollView>
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
