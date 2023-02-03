import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY_PRIMARY,
    flex: 1,
    paddingHorizontal: SIZES.PADDING_X_LARGE,
  },
  title: {
    textAlign: "center",
    marginVertical: SIZES.MARGING_X_LARGE,
    justifyContent: "center",
    alignSelf: "center",
  },
  content: {
    marginBottom: SIZES.MARGING_X_LARGE,
  },
  infoContainer: { flexDirection: "row", marginBottom: SIZES.MARGING_X_LARGE },
  circle: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    borderRadius: 20,
  },
  circleText: {
    textAlign: "center",
    color: COLORS.WHITE,
  },
  infoTitle: { alignSelf: "center" },
});

export default styles;
