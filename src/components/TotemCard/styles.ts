import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";

const CIRCLE_SIZE = 72;
const BORDER_WIDTH = 3;

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.PADDING_LARGE,
    backgroundColor: COLORS.WHITE,
    borderRadius: SIZES.RADIUS_REGULAR,
    shadowColor: COLORS.REAL_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    alignContent: "center",
    justifyContent: "center",
    marginRight: SIZES.MARGING_REGULAR,
  },
  scoreText: { textAlign: "center" },
  scoreMaxText: { textAlign: "center" },
  title: { marginBottom: SIZES.MARGING_SMALL },
  locationText: { marginBottom: SIZES.MARGING_SMALL },
  valuesMeasuredBox: { flexDirection: "row" },
  valueMeasuredInfo: { marginRight: SIZES.MARGING_REGULAR },
  mainContentBox: {
    flexDirection: "row",
    paddingHorizontal: SIZES.PADDING_LARGE,
    marginBottom: SIZES.MARGING_SMALL,
  },
  moreInfoBox: {
    alignItems: "flex-end",
    paddingVertical: SIZES.PADDING_SMALL,
    borderTopWidth: 0.2,
    borderColor: COLORS.BLACK_WITH_OPACITY,
  },
  moreInfo: {
    marginRight: SIZES.MARGING_SMALL,
  },
});

export default styles;
