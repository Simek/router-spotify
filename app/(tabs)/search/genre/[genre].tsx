import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import searchGenres from "@/assets/data/searchGenres.json";

export default function GenreScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const genreId = Array.isArray(params.genre) ? params.genre[0] : params.genre;
  const genre = searchGenres.find((genre) => genre.id === genreId);

  return (
    <View className="flex flex-1 items-center bg-black">
      <Image source={genre?.image} style={StyleSheet.absoluteFill} />
      <SafeAreaView className="w-full flex web:py-4">
        <View className="px-4 pb-3 flex flex-row justify-between items-center gap-2">
          <Pressable onPress={() => navigation.goBack()} className="size-6">
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <Text className="text-white font-medium text-lg">#{genre?.id}</Text>
          <View className="size-6" />
        </View>
      </SafeAreaView>
    </View>
  );
}
