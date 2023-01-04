import { useFonts as useFontsExpo } from "expo-font";

const fontsAvailable = {
  InterBlack: require("_/assets/fonts/Inter-Black.ttf"),
  InterBold: require("_/assets/fonts/Inter-Bold.ttf"),
  InterExtraBold: require("_/assets/fonts/Inter-ExtraBold.ttf"),
  InterExtraLight: require("_/assets/fonts/Inter-ExtraLight.ttf"),
  InterMedium: require("_/assets/fonts/Inter-Medium.ttf"),
  InterRegular: require("_/assets/fonts/Inter-Regular.ttf"),
  InterSemiBold: require("_/assets/fonts/Inter-SemiBold.ttf"),
  InterThin: require("_/assets/fonts/Inter-Thin.ttf"),
  NunitoBold: require("_/assets/fonts/Nunito-Bold.ttf"),
  NunitoRegular: require("_/assets/fonts/Nunito-Regular.ttf"),
};

export type FontsAvailableType = keyof typeof fontsAvailable;

export const useFonts = (): boolean => {
  const [isFontsLoaded] = useFontsExpo(fontsAvailable);

  return isFontsLoaded;
};
