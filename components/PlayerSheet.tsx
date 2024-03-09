import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

import { useAuthStore } from "@/utils/auth";
import { fetAPIControl, fetchAPI } from "@/utils/fetch";
import { getPreferredBackgroundColor, msToDuration } from "@/utils/helpers";
import { usePlayerStore } from "@/utils/player";

export function PlayerSheet() {
  const pathname = usePathname();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [colors, setColors] = useState<ImageColorsResult | null>(null);

  const { authToken } = useAuthStore();
  const { player, setPlayerData } = usePlayerStore();

  useEffect(() => {
    fetchAPI(`me/player`, authToken, setPlayerData);

    setInterval(() => fetchAPI(`me/player`, authToken, setPlayerData), 1000);
  }, []);

  useEffect(() => {
    if (player?.item) {
      const { url } = player.item.album.images[0];

      getColors(url, {
        fallback: "#000",
        cache: true,
        key: url,
        quality: "high",
      }).then((colors) => setColors(colors));
    }
  }, [player]);

  const progress = useSharedValue(player?.progress_ms ?? 0);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(
      progress.value,
      [0, player?.item?.duration_ms ?? 0],
      [0, 100],
      Extrapolation.CLAMP,
    )}%`,
  }));

  progress.value = player?.progress_ms ?? 0;

  const snapPoints = useMemo(() => ["100%", "100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  if (!player || !player.item || pathname.startsWith("/search/genre/")) {
    return null;
  }

  async function playPauseAction() {
    if (player) {
      if (player.is_playing) {
        await fetAPIControl(`me/player/pause`, authToken);
      } else {
        await fetAPIControl(`me/player/play`, authToken);
      }
      await fetchAPI(`me/player`, authToken, setPlayerData);
    }
  }

  async function playPreviousAction() {
    if (player) {
      await fetAPIControl(`me/player/previous`, authToken, "POST");
      await fetchAPI(`me/player`, authToken, setPlayerData);
    }
  }

  async function playNextAction() {
    if (player) {
      await fetAPIControl(`me/player/next`, authToken, "POST");
      await fetchAPI(`me/player`, authToken, setPlayerData);
    }
  }

  const backgroundColor = getPreferredBackgroundColor(colors);

  return (
    <View className="flex absolute w-full h-24 bottom-[79px]">
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["#0000", "#000c"]}
        locations={[0, 0.75]}
      />
      <Pressable onPress={handlePresentModalPress}>
        <View
          className="relative flex flex-row gap-3 w-[98vw] mx-[1vw] h-[56px] mt-[22px] rounded-lg p-2 items-center bg-[#333]"
          style={{ backgroundColor }}
        >
          <View style={StyleSheet.absoluteFill} className="bg-[#0005]" />
          <Image
            source={player.item.album.images[0].url}
            style={{ width: 40, height: 40, borderRadius: 4 }}
          />
          {player.item.duration_ms && player.progress_ms ? (
            <View className="absolute h-0.5 w-full bg-[#fff4] bottom-0 left-2">
              <Animated.View
                className="flex h-0.5 rounded-full bg-[#fff]"
                style={progressStyle}
              />
            </View>
          ) : null}
          <View className="flex gap-1 flex-grow w-[71vw]">
            <View className="flex flex-row ">
              <Text
                className="text-gray-300 font-default text-sm overflow-hidden"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                <Text className="text-white font-bold text-sm">
                  {player.item.name} •{" "}
                </Text>
                {player.item.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            {player.device && (
              <View className="flex flex-row items-center gap-1">
                <Text className="text-emerald-400">
                  <Ionicons name="volume-medium" size={16} color="inherit" />
                </Text>
                <Text className="text-emerald-400 font-default text-sm">
                  {player.device.name}
                </Text>
              </View>
            )}
          </View>
          <Pressable className="p-2" onPress={playPauseAction}>
            <Ionicons
              name={player.is_playing ? "pause" : "play"}
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
      </Pressable>
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={null}
      >
        <View className="absolute inset-0 size-full -z-[1] bg-[#111]" />
        <BottomSheetScrollView contentContainerClassName="flex flex-1 items-center bg-[#111] pt-10 rounded-t-2xl overflow-hidden min-h-[100vh]">
          <LinearGradient
            style={[StyleSheet.absoluteFill]}
            colors={[backgroundColor, "transparent"]}
            locations={[0, 0.8]}
          />
          <SafeAreaView>
            <View className="flex flex-row justify-between my-4">
              <Pressable
                onPress={() => bottomSheetModalRef?.current?.dismiss()}
              >
                <Ionicons name="chevron-down" size={24} color="#fff" />
              </Pressable>
              <Text className="text-white font-bold text-sm">
                {player.item.album.name ?? player?.context?.type ?? ""}
              </Text>
              <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            </View>
            <View className="flex w-[86vw] h-[86vw] rounded-lg overflow-hidden my-14">
              <Image
                source={player.item.album.images[0].url}
                style={StyleSheet.absoluteFill}
              />
            </View>
            <View className="flex gap-0.5 mt-4 mb-3">
              <Text
                className="text-white font-bold text-2xl w-[86vw]"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {player.item.name}
              </Text>
              <Text className="text-gray-300 font-default text-sm mb-4">
                {player.item.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            <View className="h-1 w-[86vw] bg-[#fff4]">
              <Animated.View
                className="flex h-1 bg-[#fff] rounded-full"
                style={progressStyle}
              >
                <View className="absolute rounded-full size-3 bg-[#fff] flex -right-1 -top-1" />
              </Animated.View>
            </View>
            <View className="flex flex-row justify-between mt-2">
              <Text className="text-gray-300 font-default text-xs">
                {msToDuration(player?.progress_ms)}
              </Text>
              <Text className="text-gray-300 font-default text-xs">
                {msToDuration(player?.item?.duration_ms)}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center mt-5">
              <Ionicons name="shuffle" size={36} color="#444" />
              <Pressable onPress={playPreviousAction}>
                {({ pressed }) => (
                  <Ionicons
                    name="play-skip-back"
                    size={36}
                    color="#fff"
                    className={pressed ? "scale-90" : "scale-100"}
                  />
                )}
              </Pressable>
              <Pressable onPress={playPauseAction}>
                {({ pressed }) => (
                  <View
                    className={twMerge(
                      "flex items-center justify-center size-16 bg-white rounded-full transition",
                      pressed ? "scale-90" : "scale-100",
                    )}
                  >
                    <Ionicons
                      name={player.is_playing ? "pause" : "play"}
                      size={36}
                      color="#000"
                    />
                  </View>
                )}
              </Pressable>
              <Pressable onPress={playNextAction}>
                {({ pressed }) => (
                  <Ionicons
                    name="play-skip-forward"
                    size={36}
                    color="#fff"
                    className={pressed ? "scale-90" : "scale-100"}
                  />
                )}
              </Pressable>
              <Ionicons name="repeat" size={36} color="#444" />
            </View>
            {player.device && (
              <View className="flex flex-row items-center gap-1 mt-6">
                <Text className="text-emerald-400">
                  <Ionicons name="volume-medium" size={16} color="inherit" />
                </Text>
                <Text className="text-emerald-400 font-default text-sm">
                  {player.device.name}
                </Text>
              </View>
            )}
          </SafeAreaView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}
