import { Text, SafeAreaView, FlatList, View } from "react-native";

import { ExploreGenreTile } from "@/components/ExploreGenereTile";
import { SearchTopicTile } from "@/components/SearchTopicTile";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
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
          data={[
            {
              text: "New Releases",
              color: "bg-amber-700",
              image:
                "https://i.scdn.co/image/ab67616d00001e021140ab4baf4c157f4f90e476",
            },
            {
              text: "Podcasts",
              color: "bg-violet-700",
              image:
                "https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa",
            },
            {
              text: "Hip-Hop",
              color: "bg-cyan-600",
              image:
                "https://i.scdn.co/image/ab67616d00001e023821281174782113387d45e2",
            },
            {
              text: "Pop",
              color: "bg-blue-900",
              image:
                "https://i.scdn.co/image/ab67616d00001e028cae5034066af45cdfbc4266",
            },
            { text: "New Releases", color: "bg-amber-700" },
            { text: "Podcasts", color: "bg-violet-700" },
            { text: "Hip-Hop", color: "bg-pink-600" },
            { text: "Pop", color: "bg-green-800" },
            { text: "New Releases", color: "bg-amber-700" },
            { text: "Podcasts", color: "bg-violet-700" },
            { text: "Hip-Hop", color: "bg-pink-600" },
            { text: "Pop", color: "bg-green-800" },
            { text: "New Releases", color: "bg-amber-700" },
            { text: "Podcasts", color: "bg-violet-700" },
            { text: "Hip-Hop", color: "bg-pink-600" },
            { text: "Pop", color: "bg-green-800" },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
