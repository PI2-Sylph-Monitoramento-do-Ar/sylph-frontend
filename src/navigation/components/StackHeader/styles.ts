import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.GREY_PRIMARY,
    paddingVertical: SIZES.PADDING_SMALL,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    backgroundColor: COLORS.GREY_PRIMARY,
  },
  title: {
    textAlign: "center",
    width: SIZES.SCREEN_WIDTH * 0.75,
  },
  icon: {
    position: "absolute",
    left: SIZES.PADDING_SMALL,
    top: SIZES.PADDING_SMALL,
  },
});

export default styles;
