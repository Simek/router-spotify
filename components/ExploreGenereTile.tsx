import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  item: ExploreGenreItem;
};

type ExploreGenreItem = {
  id: string;
  image?: string;
};

// NOTE: changing build-in image to expo-image break #edm GIF playback
export function ExploreGenreTile({ item }: Props) {
  return (
    <Link href={`/search/genre/${item.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className={twMerge(
              "h-48 w-[29.5vw] rounded-lg overflow-hidden bg-gray-900 transition-opacity",
              pressed && "opacity-75",
            )}
          >
            <Image
              source={item.image}
              // NOTE: class names do not work here
              // className="rounded-md absolute inset-0 w-full h-full bg-gray-800"
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={["transparent", "#000d"]}
              locations={[0.66, 1]}
            />
            <Text className="text-white text-md absolute bottom-2.5 font-default left-3">
              #{item.id}
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}
