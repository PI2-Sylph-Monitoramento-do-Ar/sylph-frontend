import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

const CONTAINER_SIZE = 40;

export const styles = StyleSheet.create({
  iconContainer: {
    height: CONTAINER_SIZE,
    width: CONTAINER_SIZE,
    borderRadius: CONTAINER_SIZE / 2,
    justifyContent: "center",
  },
  icon: { alignSelf: "center" },
});
