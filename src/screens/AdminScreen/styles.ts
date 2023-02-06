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
  newTotem: {
    height: 50,
    width: 115,
    right: 16,
    bottom: 10,

  }
});

export default styles;
