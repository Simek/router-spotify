import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { View, Text, SafeAreaView, Pressable } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <SafeAreaView className="bg-black w-full flex">
              <View className="px-4 pb-3 flex flex-row justify-between items-center gap-2">
                <Pressable
                  onPress={() => navigation.goBack()}
                  className="size-6"
                >
                  <Ionicons name="chevron-back" size={24} color="#fff" />
                </Pressable>
                <Text className="font-bold text-xl text-white">Settings</Text>
                <View className="size-6" />
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <Text className="text-white font-default">Settings</Text>
    </View>
  );
}
