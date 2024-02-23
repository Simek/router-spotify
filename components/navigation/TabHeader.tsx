import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type ReactNode } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

type Props = {
  title: string;
  navigation: DrawerNavigationProp<any> | NativeStackNavigationProp<any>;
  rightSlot?: ReactNode;
};

export function TabHeader({ title, rightSlot, navigation }: Props) {
  return (
    <SafeAreaView className="bg-black w-full flex">
      <View className="px-4 pb-3 flex flex-row justify-between items-start">
        <View className="flex flex-row items-center gap-2">
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <View className="size-8 bg-amber-300 rounded-full inline-flex" />
          </Pressable>
          <Text className="font-bold text-xl text-white">{title}</Text>
        </View>
        {rightSlot}
      </View>
    </SafeAreaView>
  );
}
