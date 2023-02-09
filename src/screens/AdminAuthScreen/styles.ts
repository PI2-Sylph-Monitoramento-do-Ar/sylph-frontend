import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center", 
    alignItems: "center",
    flex: 1
  }, 
  formText: {
    marginLeft: SIZES.MARGING_X_SMALL,
    color: 'rgba(31, 27, 36, 0.5)',
    fontWeight: 'bold',
    minWidth: 200,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
    marginTop: SIZES.MARGING_LARGE,
    width: 184,
    borderRadius: SIZES.MARGING_SMALL,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingBottom: SIZES.MARGING_LARGE,
    paddingTop: SIZES.MARGING_LARGE,
  }
});

export default styles;
