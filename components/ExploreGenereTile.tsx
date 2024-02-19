// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Image, View, Pressable, StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  item: ExploreGenreItem;
};

type ExploreGenreItem = {
  tag: string;
  image?: string;
};

export function ExploreGenreTile({ item }: Props) {
  return (
    <Pressable>
      {({ pressed }) => (
        <View
          className={twMerge(
            "h-48 w-[29.5vw] rounded-lg overflow-hidden transition-opacity",
            pressed && "opacity-75",
          )}
        >
          <Image
            // NOTE: changing build-in image to expo-image break #edm GIF playback
            // source={item.image}
            source={{ uri: item.image }}
            // NOTE: class names do not work here
            // className="rounded-md absolute inset-0 w-full h-full bg-gray-800"
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={["transparent", "#000c"]}
            locations={[0.66, 1]}
          />
          <Text className="text-white text-lg absolute bottom-2 font-default left-2.5">
            #{item.tag}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
