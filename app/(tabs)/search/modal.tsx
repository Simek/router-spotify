import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { Link, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

// NOTE: `expo-camera` crashed router app due to Worker usage
export default function ScanCodeModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const isPresented = router.canGoBack();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="bg-[#000a] flex flex-1">
        <Text className="text-white font-default">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View className="bg-black flex flex-1">
      <CameraView className="flex flex-1" facing="back">
        {isPresented && (
          <Link href="../" className="m-4">
            <Ionicons name="close" size={30} color="#fff" />
          </Link>
        )}
      </CameraView>
    </View>
  );
}
