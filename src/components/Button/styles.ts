import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

const MIN_WIDTH = 180;

type ButtonStyles = {
  buttonBody: ViewStyle;
  title: TextStyle;
};

export const baseStyles = StyleSheet.create<ButtonStyles>({
  buttonBody: {
    borderRadius: SIZES.RADIUS_SMALL,
    minWidth: MIN_WIDTH,
  },
  title: {
    alignSelf: "center",
    fontWeight: "400",
    fontSize: FONTS.FONT_SIZE_REGULAR,
    paddingVertical: SIZES.PADDING_LARGE,
    paddingHorizontal: SIZES.PADDING_XX_LARGE,
    fontFamily: FONTS.INTER_REGULAR_FAMILY,
  },
});

export const primaryStyles = StyleSheet.create<ButtonStyles>({
  buttonBody: {
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  title: {
    color: COLORS.WHITE,
  },
});

export const secondaryStyles = StyleSheet.create<ButtonStyles>({
  buttonBody: {
    backgroundColor: COLORS.WHITE,
  },
  title: {
    color: COLORS.BLACK,
  },
});
