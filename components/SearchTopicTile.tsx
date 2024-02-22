import { Link } from "expo-router";
import { Text, View, Image, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";

import { type SearchTopicItem } from "@/types/global";

type Props = {
  item: SearchTopicItem;
};

export function SearchTopicTile({ item }: Props) {
  // NOTE: this link works on Web, but not on native platforms
  // also on the Web using it causes app to refresh on scene enter
  return (
    <Link
      href={{
        pathname: "/search/[genre]",
        params: { genre: item.id },
      }}
    >
      <Pressable>
        {({ pressed }) => (
          <View
            className={twMerge(
              "h-28 px-3 py-2 w-[46vw] rounded-lg overflow-hidden transition-opacity",
              item.color,
              pressed && "opacity-80",
            )}
          >
            <Text className="text-white font-bold text-md">{item.text}</Text>
            <Image
              source={{
                uri:
                  item.image ??
                  "https://i.scdn.co/image/ab67616d00001e0292013fc6aec83816d16bb45f",
              }}
              className={twMerge(
                "size-24 rounded-md absolute -right-6 -bottom-4 rotate-[30deg] shadow",
                item.color,
              )}
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
}
