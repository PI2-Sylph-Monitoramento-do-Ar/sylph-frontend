import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";
import { FONTS } from "_/constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING_XX_LARGE,
    backgroundColor: COLORS.GREY_PRIMARY,
  },
  titleWrapper: {
    marginBottom: SIZES.MARGING_LARGE,
  },
  totens: {
    flexDirection: "column",
    marginVertical: SIZES.MARGING_REGULAR,
  },
  totemCard: {
    marginBottom: SIZES.MARGING_LARGE,
  },
  title: {
    textAlign: "center",
  },
});

export default styles;