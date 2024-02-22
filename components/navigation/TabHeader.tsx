import { type ReactNode } from "react";
import { SafeAreaView, Text, View } from "react-native";

type Props = {
  title: string;
  rightSlot?: ReactNode;
};

export function TabHeader({ title, rightSlot }: Props) {
  return (
    <SafeAreaView className="bg-black w-full flex">
      <View className="px-4 pb-3 flex flex-row justify-between items-start">
        <View className="flex flex-row items-center gap-2">
          <View className="size-8 bg-amber-300 rounded-full inline-flex" />
          <Text className="font-bold text-xl text-white">{title}</Text>
        </View>
        {rightSlot}
      </View>
    </SafeAreaView>
  );
}
