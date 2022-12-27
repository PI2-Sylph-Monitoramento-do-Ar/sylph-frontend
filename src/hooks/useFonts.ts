import { useFonts as useFontsExpo } from "expo-font";

export const useFonts = (): boolean => {
  const [isFontsLoaded] = useFontsExpo({
    InterBlack: require("_/assets/fonts/Inter-Black.ttf"),
    InterBold: require("_/assets/fonts/Inter-Bold.ttf"),
    InterExtraBold: require("_/assets/fonts/Inter-ExtraBold.ttf"),
    InterExtraLight: require("_/assets/fonts/Inter-ExtraLight.ttf"),
    InterMedium: require("_/assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("_/assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("_/assets/fonts/Inter-SemiBold.ttf"),
    InterThin: require("_/assets/fonts/Inter-Thin.ttf"),
  });

  return isFontsLoaded;
};
