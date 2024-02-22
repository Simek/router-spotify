import { Link } from "expo-router";
import { Text, View, Image, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  item: SearchTopicItem;
};

type SearchTopicItem = {
  text: string;
  color: string;
  image?: string;
};

export function SearchTopicTile({ item }: Props) {
  // NOTE: this link works on Web, but not on native platforms
  // also on the Web using it causes app to refresh on scene enter
  return (
    <Link
      push
      href={{
        pathname: "/search/[genre]",
        params: { genre: item.text.replaceAll(" ", "-").toLowerCase() },
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
                // NOTE: looks like arbitrary rotate works fine, but it crashes after few refreshes,
                // especially after unrelated crash has happened
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
