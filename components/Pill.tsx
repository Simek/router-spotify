import { type ReactNode } from "react";
import { View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
  content: ReactNode;
  isActive?: boolean;
  className?: string;
};

export function Pill({ content, isActive, className }: Props) {
  return (
    <View
      className={twMerge(
        "rounded-full h-8 px-4 bg-[#222] items-center justify-center transition-colors",
        "hover:bg-[#2a2a2a]",
        isActive && "bg-emerald-500 hover:bg-emerald-400",
        className,
      )}
    >
      {typeof content === "string" ? (
        <Text
          className={twMerge(
            "text-white text-sm font-default",
            isActive && "text-black",
          )}
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </View>
  );
}
