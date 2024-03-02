import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import type { Track } from "@/types/spotify";

type Props = {
  item: Track;
};

export function TopTrackTile({ item }: Props) {
  return (
    <View
      key={item.id}
      className="flex flex-row gap-2 items-center rounded-md bg-[#222] w-[46vw] pr-2"
    >
      <View className="size-16 rounded-l-md inline-flex overflow-hidden">
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
  );
}
