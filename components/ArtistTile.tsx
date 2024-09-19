import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Artist, Track } from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";
import { fetchAPI, fetchAPIControl } from "@/utils/fetch";
import { usePlayerStore } from "@/utils/player";

const PER_PAGE = 3;

type Props = { item: Artist };

export function ArtistTile({ item }: Props) {
  const { authToken } = useAuthStore();
  const { player } = usePlayerStore();

  async function playNowAction() {
    if (player) {
      await fetchAPI(
        `artists/${item.id}/top-tracks?time_range=short_term&limit=${PER_PAGE}&offset=0`,
        authToken,
        async (result: { tracks: Track[] }) => {
          await fetchAPIControl(
            `me/player/queue?uri=${result.tracks[0].uri}`,
            authToken,
            "POST",
          );
          await fetchAPIControl(`me/player/next`, authToken, "POST");
        },
      ).catch(console.error);
    }
  }

  return (
    <Pressable onPress={playNowAction}>
      {({ pressed }) => (
        <View
          key={`top-artist-${item.id}`}
          className={twMerge(
            "flex gap-2 items-center",
            pressed ? "scale-95" : "scale-100",
          )}
        >
          <View className="size-32 bg-[#111] rounded-full inline-flex overflow-hidden">
            <Image
              source={item.images[0].url}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <Text className="text-white font-default">{item.name}</Text>
        </View>
      )}
    </Pressable>
  );
}
