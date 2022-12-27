import { useFonts as useFontsExpo } from "expo-font";

export const useFonts = (): boolean => {
  const [isFontsLoaded] = useFontsExpo({
    Inter: require("_/assets/Inter.ttf"),
  });

  return isFontsLoaded;
};
