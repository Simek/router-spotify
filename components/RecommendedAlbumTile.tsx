import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Album } from "@/types/spotify";
import { useAuthStore } from "@/utils/auth";
import { fetchAPIControl } from "@/utils/fetch";
import { usePlayerStore } from "@/utils/player";

type Props = {
  item: Album;
  uri: string;
};

export function RecommendedAlbumTile({ item, uri }: Props) {
  const { authToken } = useAuthStore();
  const { player } = usePlayerStore();

  async function playNowAction() {
    if (player) {
      await fetchAPIControl(
        `me/player/queue?uri=${uri}`,
        authToken,
        "POST",
      ).then(
        async () => await fetchAPIControl(`me/player/next`, authToken, "POST"),
      );
    }
  }

  return (
    <Pressable onPress={playNowAction} key={item.id}>
      {({ pressed }) => (
        <View className={twMerge("gap-2", pressed ? "scale-95" : "scale-100")}>
          <View className="size-48">
            <Image
              source={item.images[0].url}
              style={StyleSheet.absoluteFill}
            />
          </View>
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
    </Pressable>
  );
}
