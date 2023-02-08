import { StyleSheet } from "react-native";
import { FONTS } from "_/constants/fonts";
import { SIZES } from "_/constants/sizes";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: SIZES.MARGING_LARGE,
        borderRadius: 64
    },
    title: {
      fontSize: FONTS.FONT_SIZE_LARGE,
      fontFamily: FONTS.INTER_BOLD,
      textAlign: 'center',
    },
    qrcode: {
        width: '80%',
        height: '45%'
    },
    infosContainer: {
      marginHorizontal: SIZES.MARGING_REGULAR
    },
    description: {
      fontSize: FONTS.FONT_SIZE_REGULAR,
      fontFamily: FONTS.INTER_REGULAR,
      textAlign: 'center',
      marginBottom: SIZES.MARGING_REGULAR
    }

})

export default styles;
