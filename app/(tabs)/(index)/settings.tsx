import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView, Pressable } from "react-native";

import { useAuthStore } from "@/utils/auth";
import { useUserStore } from "@/utils/user";

export default function SettingsScreen() {
  const { setAuthToken, setRefreshToken } = useAuthStore();
  const { setUser } = useUserStore();

  const { navigate } = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <SafeAreaView className="bg-black w-full flex web:py-4">
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
      <Pressable
        className="bg-white rounded-full py-2 px-5 items-center min-w-[33vw]"
        onPress={() => {
          navigate("/");
          setAuthToken(null);
          setRefreshToken(null);
          setUser(null);
        }}
      >
        <Text className="font-default text-lg">Log out</Text>
      </Pressable>
    </View>
  );
}
