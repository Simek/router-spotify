import { ImageColorsResult } from "react-native-image-colors";

export function msToDuration(value?: number | null) {
  if (!value) {
    return 0;
  }

  const seconds = Math.floor(value / 1000);

  return `${Math.floor(seconds / 60)}:${
    seconds % 60 >= 10 ? seconds % 60 : `0${seconds % 60}`
  }`;
}

function isInvalidColor(color: string) {
  return color.includes("FF") || color.includes("FE") || color.includes("0");
}

export function getPreferredBackgroundColor(colors: ImageColorsResult | null) {
  if (!colors) {
    return "#111";
  }

  if (colors.platform === "ios") {
    if (isInvalidColor(colors.primary)) {
      if (isInvalidColor(colors.detail)) {
        if (isInvalidColor(colors.secondary)) {
          return colors.background;
        } else {
          return colors.secondary;
        }
      } else {
        return colors.detail;
      }
    } else {
      return colors.primary;
    }
  } else {
    return colors.vibrant;
  }
}
