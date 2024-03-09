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

export function getPreferredBackgroundColor(colors: ImageColorsResult | null) {
  if (!colors) {
    return "#111";
  }

  if (colors.platform === "ios") {
    if (!colors.detail.includes("F") && !colors.detail.includes("00")) {
      return colors.detail;
    } else {
      return colors.primary;
    }
  } else {
    return colors.vibrant;
  }
}
