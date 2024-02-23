import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

export function DrawerContent() {
  return (
    <SafeAreaView className="flex flex-1 bg-[#101010]">
      <View className="px-4 py-2 gap-6">
        <View className="flex flex-row items-center gap-3 mb-2">
          <View className="size-12 bg-amber-300 rounded-full inline-flex" />
          <View>
            <Text className="font-bold text-xl text-white">You</Text>
            <Text className="font-default text-sm text-gray-400">
              View profile
            </Text>
          </View>
        </View>
        <Pressable className="flex flex-row gap-2 items-center ">
          <Ionicons name="flash-outline" size={24} color="#fff" />
          <Text className="font-default text-md text-white">What's new</Text>
        </Pressable>
        <Link href="/settings" asChild>
          <Pressable>
            {({ pressed }) => (
              <View
                className={twMerge(
                  "flex flex-row gap-2 items-center",
                  pressed && "opacity-80",
                )}
              >
                <Ionicons name="settings-outline" size={24} color="#fff" />
                <Text className="font-default text-md text-white">
                  Settings and privacy
                </Text>
              </View>
            )}
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
