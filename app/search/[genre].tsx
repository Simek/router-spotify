import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import searchTopics from "@/assets/data/searchTopics.json";

export default function Genre() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const genreId = Array.isArray(params.genre) ? params.genre[0] : params.genre;
  const genre =
    searchTopics && searchTopics.find((topic) => topic.id === genreId);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <SafeAreaView className={twMerge(genre?.color)}>
                <LinearGradient
                  style={StyleSheet.absoluteFill}
                  colors={["transparent", "#000"]}
                  locations={[0.15, 0.95]}
                />
                <Pressable onPress={() => router.navigate("/search")}>
                  {({ pressed }) => (
                    <Ionicons
                      name="chevron-back"
                      className={twMerge(
                        "px-2 mb-2",
                        pressed && "text-opacity-80",
                      )}
                      size={24}
                      color="#fff"
                    />
                  )}
                </Pressable>
                <View className="px-4 pb-3">
                  <Text className="font-bold text-2xl text-white">
                    {genre?.text}
                  </Text>
                </View>
              </SafeAreaView>
            );
          },
        }}
      />
    </View>
  );
}
