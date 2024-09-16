import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  href: Href<string>;
  iconName: keyof typeof Ionicons.glyphMap;
};

export default function DrawerLink({ title, href, iconName }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className={twMerge(
              "flex flex-row gap-2 items-center py-2",
              "hover:opacity-80",
              pressed && "opacity-80",
            )}
          >
            <Ionicons name={iconName} size={24} color="#fff" />
            <Text className="font-default text-md text-white">{title}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}
