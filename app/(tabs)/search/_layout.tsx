import { Stack } from "expo-router";

// NOTE: using native stack inside tab causes white background flash on first enter
// did not find a way to prevent that yet
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[genre]" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
