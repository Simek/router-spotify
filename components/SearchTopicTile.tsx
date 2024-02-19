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
  return (
    <Pressable>
      {({ pressed }) => (
        <View
          className={twMerge(
            "h-28 px-3 py-2 w-[46vw] rounded-lg overflow-hidden transition-opacity",
            item.color,
            pressed && "opacity-80",
          )}
        >
          <Text className="text-white font-bold text-xl">{item.text}</Text>
          <Image
            source={{
              uri:
                item.image ??
                "https://i.scdn.co/image/ab67616d00001e0292013fc6aec83816d16bb45f",
            }}
            // NOTE: arbitrary rotate value crashes app, extended theme instead
            className={twMerge(
              "size-24 rounded-md absolute -right-6 -bottom-4 rotate-30 bg-gray-800",
              // NOTE: using "shadow" class produces warning on iOS
              false && "shadow",
            )}
          />
        </View>
      )}
    </Pressable>
  );
}
