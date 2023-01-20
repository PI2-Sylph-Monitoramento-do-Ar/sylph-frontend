import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";
import { FONTS } from "_/constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING_X_LARGE,
    backgroundColor: COLORS.GREY_PRIMARY,
  },
  resumeWrapper: {
    marginBottom: SIZES.MARGING_XX_LARGE,
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SIZES.MARGING_REGULAR,
    flexWrap: "wrap",
  },
  mapWrapper: {
    marginTop: SIZES.MARGING_SMALL,
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: 150,
  },
  totemTitle: {
    textAlign: "center",
  },
  resumeText: {
    marginBottom: SIZES.MARGING_X_SMALL,
    fontSize: FONTS.FONT_SIZE_REGULAR,
  },
  updateText: {
    color: COLORS.GREY_TERTIARY,
    fontSize: FONTS.FONT_SIZE_SMALL,
  },
});

export default styles;
