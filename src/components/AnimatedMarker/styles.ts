import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";

const MARKER_DIAMETER = 50;

const styles = StyleSheet.create({
  transparentBox: { width: MARKER_DIAMETER * 1.5 },
  content: {
    height: MARKER_DIAMETER,
    justifyContent: "center",
    width: MARKER_DIAMETER,
    borderRadius: MARKER_DIAMETER / 2,
  },
  markerLabelBox: {
    zIndex: 1,
    overflow: "visible",
    backgroundColor: COLORS.WHITE,
    minWidth: MARKER_DIAMETER,
    maxWidth: MARKER_DIAMETER * 1.5,
    justifyContent: "center",
  },
  iconInfo: {
    alignSelf: "center",
  },
});

export default styles;
