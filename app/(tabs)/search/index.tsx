import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, FlatList, View, Pressable, ScrollView } from "react-native";

import searchGenres from "@/assets/data/searchGenres.json";
import searchTopics from "@/assets/data/searchTopics.json";
import { ExploreGenreTile } from "@/components/ExploreGenereTile";
import { SearchTopicTile } from "@/components/SearchTopicTile";
import { TabHeader } from "@/components/navigation/TabHeader";

export default function SearchScreen() {
  return (
    <View className="flex-1 bg-black">
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
              bottomSlot={
                <View className="px-4 pb-4 web:pb-0">
                  <Pressable className="py-2.5 px-3.5 flex flex-row text-gray-300 bg-white rounded-md items-center gap-2">
                    <Ionicons name="search-outline" size={24} />
                    <Text className="font-light">
                      What do you want to listen to?
                    </Text>
                  </Pressable>
                </View>
              }
            />
          ),
        }}
      />
      <ScrollView className="pl-2.5">
        <FlatList
          numColumns={2}
          ListHeaderComponent={
            <>
              <FlatList
                className="mb-4 -mt-2"
                numColumns={3}
                ListHeaderComponent={
                  <Text className="text-white text-xl font-bold py-6">
                    Explore your genres
                  </Text>
                }
                renderItem={ExploreGenreTile}
                columnWrapperClassName="gap-4"
                data={searchGenres}
              />
              <Text className="text-white text-xl font-bold py-2">
                Browse all
              </Text>
            </>
          }
          ListFooterComponent={<View className="h-20 w-full" />}
          renderItem={SearchTopicTile}
          columnWrapperClassName="gap-4"
          contentContainerClassName="gap-4 mx-auto"
          data={searchTopics}
        />
      </ScrollView>
    </View>
  );
}
