import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

export const styles = StyleSheet.create({
  buttonBody: {
    borderRadius: SIZES.RADIUS_LARGE,
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  contentBox: {
    flexDirection: "row",
    paddingVertical: SIZES.PADDING_REGULAR,
    paddingHorizontal: SIZES.PADDING_LARGE,
  },
  icon: {
    color: COLORS.WHITE,
    alignSelf: "center",
    marginRight: SIZES.MARGING_SMALL,
  },
  title: {
    alignSelf: "center",
    fontWeight: "700",
    fontSize: FONTS.FONT_SIZE_REGULAR,
    fontFamily: FONTS.INTER_BOLD,
    color: COLORS.WHITE,
  },
});
