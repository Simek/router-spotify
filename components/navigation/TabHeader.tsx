import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { type ReactNode } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

type Props = {
  leftSlot: ReactNode;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
};

export function TabHeader({ leftSlot, rightSlot, bottomSlot }: Props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="w-full flex">
      <View className="px-4 pb-3 flex flex-row justify-between items-start">
        <View className="flex flex-row items-center gap-2">
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <View className="size-8 bg-amber-300 rounded-full inline-flex" />
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
