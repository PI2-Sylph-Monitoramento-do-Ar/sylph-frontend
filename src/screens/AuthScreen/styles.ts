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
  welcomeTitle: {
    marginBottom: SIZES.MARGING_LARGE,
  },
  welcomeText: {
    marginBottom: SIZES.MARGING_XX_LARGE,
  },
  mainButton: {
    marginBottom: SIZES.MARGING_LARGE,
  },
  buttonBox: {
    paddingBottom: SIZES.PADDING_LARGE,
  },
});

export default styles;
