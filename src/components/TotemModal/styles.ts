import { StyleSheet } from "react-native";
import { COLORS } from "_/constants/colors";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: COLORS.GREY_PRIMARY,
    paddingHorizontal: SIZES.MARGING_LARGE,
    paddingVertical: SIZES.MARGING_LARGE,
    borderRadius: 16,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: FONTS.FONT_SIZE_XX_REGULAR,
    marginBottom: SIZES.MARGING_SMALL,
  },
  backButton: {
    backgroundColor: COLORS.GREY_PRIMARY,
    color: COLORS.WHITE,
    alignSelf: "center",
    marginRight: SIZES.MARGING_SMALL,
  },
  backText: {
    fontSize: FONTS.FONT_SIZE_XX_REGULAR,
  },
  formBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: SIZES.MARGING_SMALL,
    marginBottom: SIZES.MARGING_SMALL,
    marginTop: SIZES.MARGING_SMALL,
    paddingBottom: SIZES.MARGING_SMALL,
    paddingTop: SIZES.MARGING_SMALL,
    paddingLeft: SIZES.MARGING_SMALL,
  },
  icon: {
    color: 'rgba(31, 27, 36, 0.71)',
  },
  formText: {
    marginLeft: SIZES.MARGING_X_SMALL,
    color: 'rgba(31, 27, 36, 0.5)',
    fontWeight: 'bold',
    minWidth: 200,
  },
  buttonWrapper: {
    alignItems: 'center',
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
