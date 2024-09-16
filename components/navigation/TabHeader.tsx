import { DrawerActions } from "@react-navigation/native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { type ReactNode } from "react";
import { Pressable, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

import { useUserStore } from "@/utils/user";

type Props = {
  leftSlot: ReactNode;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
};

export function TabHeader({ leftSlot, rightSlot, bottomSlot }: Props) {
  const navigation = useNavigation();
  const { user } = useUserStore();

  return (
    <SafeAreaView className="w-full flex bg-black web:py-4">
      <View
        className={twMerge(
          "px-4 flex flex-row justify-between items-start",
          bottomSlot && "pb-3",
        )}
      >
        <View className="flex flex-row items-center gap-2">
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <View className="size-8 bg-amber-300 rounded-full inline-flex overflow-hidden">
              {user && user.images[0] && (
                <Image
                  source={user.images[0].url}
                  style={StyleSheet.absoluteFill}
                />
              )}
            </View>
          </Pressable>
          {typeof leftSlot === "string" ? (
            <Text className="font-bold text-xl text-white">{leftSlot}</Text>
          ) : (
            leftSlot
          )}
        </View>
        {rightSlot}
      </View>
      {bottomSlot}
    </SafeAreaView>
  );
}
