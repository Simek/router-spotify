import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

// NOTE: '+not-found' is displayed as tab, when Tabs are a root nav
export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <View className="gap-4 items-center">
        <Text className="text-white font-medium text-lg">
          This screen doesn't exist.
        </Text>
        <Link className="text-white font-default" href="/">
          <Text>Home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
