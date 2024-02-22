import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

// NOTE: '+not-found' is displayed as tab, when Tabs are a root nav
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
