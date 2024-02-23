import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, SafeAreaView, FlatList, View } from "react-native";

import searchTopics from "@/assets/data/searchTopics.json";
import { ExploreGenreTile } from "@/components/ExploreGenereTile";
import { SearchTopicTile } from "@/components/SearchTopicTile";
import { TabHeader } from "@/components/navigation/TabHeader";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <TabHeader
              leftSlot="Search"
              rightSlot={
                <Link href="/search/modal">
                  <Ionicons size={30} name="camera-outline" color="#fff" />
                </Link>
              }
            />
          ),
        }}
      />
      <View className="pl-2">
        <FlatList
          numColumns={2}
          ListHeaderComponent={
            <>
              <FlatList
                className="mb-4"
                numColumns={3}
                ListHeaderComponent={
                  <Text className="text-white text-xl font-bold py-6">
                    Explore your genres
                  </Text>
                }
                renderItem={ExploreGenreTile}
                columnWrapperStyle={{ gap: 15 }}
                data={[
                  {
                    tag: "hip-hop",
                    image:
                      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzluZGIxank0YWZ5a2I2YnhpNTRvdmlqeHM0M2Npd3M1NjNxNnV5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pke0yGTATx1JDzd6AE/giphy.gif",
                  },
                  {
                    tag: "edm",
                    image: "https://i.giphy.com/ncdSIcmB7iGEvDX1Z3.webp",
                  },
                  {
                    tag: "future",
                    image:
                      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnl2OXJzcHFqcWdic2k3aTFxOTNxdmo0OW5wdzhicTc1aWloNWx2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X8BW0427XqFNKrH1hE/giphy.gif",
                  },
                ]}
              />
              <Text className="text-white text-xl font-bold py-2">
                Browse all
              </Text>
            </>
          }
          ListFooterComponent={<View className="h-12 w-full" />}
          renderItem={SearchTopicTile}
          contentContainerStyle={{ gap: 16 }}
          columnWrapperStyle={{ gap: 16 }}
          data={searchTopics}
        />
      </View>
    </SafeAreaView>
  );
}
