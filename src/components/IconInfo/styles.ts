import { StyleSheet } from "react-native";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  iconLeft: {
    marginRight: SIZES.MARGING_X_SMALL,
  },
  iconRight: {
    marginLeft: SIZES.MARGING_X_SMALL,
  },
});

export default styles;
