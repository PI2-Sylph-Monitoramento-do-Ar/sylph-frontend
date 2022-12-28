import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  cardBody: {
    borderRadius: SIZES.RADIUS_SMALL,
    paddingVertical: SIZES.PADDING_SMALL,
    backgroundColor: COLORS.WHITE,
  },
  titleBox: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: SIZES.MARGING_SMALL,
  },
  titleIcon: {
    marginRight: SIZES.MARGING_SMALL,
    color: COLORS.BLACK,
    opacity: 0.4,
  },
  title: {
    color: COLORS.BLACK,
    fontFamily: FONTS.INTER_REGULAR,
    opacity: 0.4,
  },
  dataText: {
    textAlign: "center",
    marginBottom: SIZES.MARGING_REGULAR,
    fontFamily: FONTS.INTER_BOLD,
    fontSize: FONTS.FONT_SIZE_LARGE,
  },
  minMaxBox: {
    flexDirection: "row",
    paddingHorizontal: SIZES.PADDING_SMALL,
    justifyContent: "space-between",
  },
  minMaxText: {
    fontFamily: FONTS.INTER_REGULAR,
    fontSize: FONTS.FONT_SIZE_SMALL,
  },
  moreInfoBox: {
    flexDirection: "row",
    alignSelf: "center",
    borderTopWidth: 0.2,
    marginTop: SIZES.MARGING_SMALL,
    paddingTop: SIZES.PADDING_SMALL,
    borderColor: COLORS.BLACK_WITH_OPACITY,
    paddingHorizontal: SIZES.PADDING_X_LARGE,
  },
  moreInfoText: {
    fontFamily: FONTS.INTER_BOLD,
    fontSize: FONTS.FONT_SIZE_SMALL,
    textAlign: "center",
    color: COLORS.PRIMARY_COLOR,
  },
  moreInfoIcon: {
    color: COLORS.PRIMARY_COLOR,
  },
});

export default styles;
