import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Genre() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          title: Array.isArray(params.genre) ? params.genre[0] : params.genre,
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
