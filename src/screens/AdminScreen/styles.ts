import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREY_PRIMARY,
  },
  scrollViewContainer: {
    paddingHorizontal: SIZES.PADDING_XX_LARGE,
  },
  titleWrapper: {
    marginBottom: SIZES.MARGING_LARGE,
  },
  totemCard: {
    marginBottom: SIZES.MARGING_X_LARGE,
  },
  title: {
    textAlign: "center",
  },
});

export default styles;
