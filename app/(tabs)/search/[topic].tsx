import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import searchTopics from "@/assets/data/searchTopics.json";

export default function TopicScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const topic =
    searchTopics && searchTopics.find((topic) => topic.id === topicId);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <SafeAreaView className={twMerge(topic?.color)}>
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
                    {topic?.text}
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
