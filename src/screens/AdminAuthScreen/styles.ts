import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center", 
    alignItems: "center",
    flex: 1,
    padding: 20
  }, 
  formText: {
    marginLeft: SIZES.MARGING_X_SMALL,
    color: 'rgba(31, 27, 36, 0.5)',
    fontWeight: 'bold',
    minWidth: 200,
  },
  title: {
    marginBottom: 20,
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
  }, 
  input: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SIZES.MARGING_SMALL,
    marginBottom: SIZES.MARGING_SMALL,
    marginTop: SIZES.MARGING_SMALL,
    paddingBottom: SIZES.MARGING_SMALL,
    paddingTop: SIZES.MARGING_SMALL,
    paddingLeft: SIZES.MARGING_SMALL,
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_COLOR,
    width: "100%",
  }
});

export default styles;
