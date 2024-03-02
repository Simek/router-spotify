import { Link, router } from "expo-router";
import { Text, View, Image, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";

import { type SearchTopicItem } from "@/types/global";

type Props = {
  item: SearchTopicItem;
};

export function SearchTopicTile({ item }: Props) {
  return (
    <Link href={`/search/${item.id}`} asChild>
      <Pressable onPress={() => router.navigate(`/search/${item.id}`)}>
        {({ pressed }) => (
          <View
            className={twMerge(
              "h-28 px-4 py-3 w-[46vw] rounded-lg overflow-hidden transition-opacity",
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
