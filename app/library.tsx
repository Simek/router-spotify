import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function LibraryScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#000" },
          headerTitle: ({ children, tintColor }) => (
            <Text className="font-bold text-xl text-white">{children}</Text>
          ),
          // NOTE: custom header seems to not work
          // header: ({ navigation, route, options, back }) => (
          //   <View className="flex-1 items-center justify-center bg-amber-800 h-16">
          //     <Text className="font-bold text-xl text-white">Your Library</Text>
          //   </View>
          // )
        }}
      />
      <Text className="text-white font-default">Library</Text>
    </View>
  );
}
