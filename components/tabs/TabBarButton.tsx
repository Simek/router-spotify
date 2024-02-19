import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";

export function TabBarButton(props: BottomTabBarButtonProps) {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <View
          className={twMerge(`transition`, pressed ? "scale-90" : "scale-100")}
        >
          {props.children}
        </View>
      )}
    </Pressable>
  );
}
