import { StyleSheet } from "react-native";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  totemCard: {
    marginHorizontal: "2.5%",
  },
  floattingButton: {
    position: "absolute",
    top: SIZES.MARGING_REGULAR,
    right: SIZES.MARGING_REGULAR,
    zIndex: 1,
  },
});

export default styles;
