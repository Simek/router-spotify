import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

import { TabHeader } from "@/components/navigation/TabHeader";

export default function LibraryScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <TabHeader
              title="Your Library"
              navigation={navigation}
              rightSlot={<Ionicons size={30} name="add" color="#fff" />}
            />
          ),
        }}
      />
      <Text className="text-white font-default">Library</Text>
    </View>
  );
}
