import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Track } from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";
import { fetchAPIControl } from "@/utils/fetch";
import { usePlayerStore } from "@/utils/player";

type Props = {
  item: Track;
};

export function TopTrackTile({ item }: Props) {
  const { authToken } = useAuthStore();
  const { player } = usePlayerStore();

  const isPlaying = player?.item?.uri === item.uri;

  async function playNowAction() {
    if (player) {
      await fetchAPIControl(
        `me/player/queue?uri=${item.uri}`,
        authToken,
        "POST",
      );
      await fetchAPIControl(`me/player/next`, authToken, "POST");
    }
  }

  return (
    <Pressable onPress={playNowAction}>
      {({ pressed }) => (
        <View
          className={twMerge(
            "flex flex-row gap-2 items-center rounded-md bg-[#222] w-[46vw] pr-2 relative transition",
            "web:w-[23.5vw]",
            pressed ? "scale-95" : "scale-100",
          )}
        >
          <View className="size-16 rounded-l-md inline-flex overflow-hidden">
            <Image
              source={item.album.images[0].url}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <Text
            className={twMerge(
              "text-white text-sm font-default break-words w-[28vw] px-1.5",
              isPlaying ? "w-[26vw]" : "",
            )}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          {isPlaying && (
            <Ionicons
              name="stats-chart"
              size={16}
              color="#12B981"
              className="absolute right-3"
            />
          )}
        </View>
      )}
    </Pressable>
  );
}
