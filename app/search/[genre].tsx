import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
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
          title: genre?.text,
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: ({ children, tintColor }) => (
            <Text className="font-bold text-xl text-white">{children}</Text>
          ),
          // NOTE: headerBackground also seems to not work
          // headerStyle: { backgroundColor: "#000" },
          headerBackground: () => {
            return <View className={twMerge(genre?.color)} />;
          },
        }}
      />
      <Text
        className="font-medium text-white"
        onPress={() => {
          // NOTE: looks like router generate types do not correctly cover this case,
          // link works correctly on the Web
          // @ts-ignore
          router.push("/search");
        }}
      >
        Go back
      </Text>
    </View>
  );
}
