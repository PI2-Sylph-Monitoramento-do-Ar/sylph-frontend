import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";

const MARKER_DIAMETER = 50;

const styles = StyleSheet.create({
  content: {
    height: MARKER_DIAMETER,
    width: MARKER_DIAMETER,
    borderRadius: MARKER_DIAMETER / 2,
  },
  markerLabelBox: {
    backgroundColor: COLORS.WHITE,
    minwidth: MARKER_DIAMETER,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  iconInfo: {
    alignSelf: "center",
  },
});

export default styles;
