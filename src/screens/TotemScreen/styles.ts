import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING_XX_LARGE,
    backgroundColor: COLORS.GREY_PRIMARY,
    justifyContent: "space-between",
  },
  baseText: {
    textAlign: "center",
  },
  image: {
    marginVertical: SIZES.MARGING_XX_LARGE,
  },
  totemTitle: {
    // marginBottom: SIZES.MARGING_X_SMALL,
    textAlign: "center",
  },
  resumText: {
    // marginBottom: SIZES.MARGING_X_SMALL,
  },
  mainButton: {
    marginBottom: SIZES.MARGING_LARGE,
  },
});

export default styles;
