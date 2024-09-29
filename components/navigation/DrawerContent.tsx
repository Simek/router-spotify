import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import DrawerLink from "@/components/navigation/DrawerLink";
import { useUserStore } from "@/utils/user";

export function DrawerContent() {
  const { user } = useUserStore();
  return (
    <SafeAreaView className="flex flex-1 bg-[#101010]">
      <View className="px-4 py-2 gap-2 web:py-6">
        <Link href="/profile" asChild>
          <Pressable>
            {({ pressed }) => (
              <View className="flex flex-row items-center gap-3 mb-2">
                <View
                  className={twMerge(
                    "size-12 bg-amber-300 rounded-full inline-flex overflow-hidden",
                    pressed && "opacity-80",
                  )}
                >
                  {user && user.images[0] && (
                    <Image
                      source={user.images[0].url}
                      style={StyleSheet.absoluteFill}
                    />
                  )}
                </View>
                <View>
                  <Text className="font-bold text-xl text-white">
                    {user?.display_name ?? "You"}
                  </Text>
                  <Text className="font-default text-sm text-gray-400">
                    View profile
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </Link>
        <Pressable className="flex flex-row gap-2 py-2 items-center">
          <Ionicons name="flash-outline" size={24} color="#fff" />
          <Text className="font-default text-md text-white">What's new</Text>
        </Pressable>
        <DrawerLink
          href="/settings"
          title="Settings and privacy"
          iconName="settings-outline"
        />
        <DrawerLink
          href="/_sitemap"
          title="Sitemap"
          iconName="trail-sign-outline"
        />
      </View>
    </SafeAreaView>
  );
}
