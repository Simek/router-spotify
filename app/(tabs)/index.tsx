import { Stack } from "expo-router";
import { View, Text } from "react-native";

import { TabHeader } from "@/components/navigation/TabHeader";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <TabHeader title="Home" navigation={navigation} />
          ),
        }}
      />
      <Text className="text-white font-default">Home</Text>
    </View>
  );
}
