import React from "react";
import { Text as TextRN, TextStyle } from "react-native";
import { TextProps } from "react-native-svg";
import { FontsAvailableType } from "_/hooks/useFonts";
import { FONTS } from "_/constants/fonts";
import { COLORS } from "_/constants/colors";

type fontSize = "xSmall" | "small" | "regular" | "large" | "xLarge" | "xxLarge";

interface ITextProps extends TextProps {
  family?: FontsAvailableType;
  size?: fontSize;
  bold?: boolean;
  color?: string;
  style?: TextStyle | TextStyle[];
}

const Text = ({
  color = COLORS.BLACK,
  style = {},
  size,
  family,
  ...rest
}: ITextProps) => {
  const fontSize = getSize(size);
  const fontFamily: FontsAvailableType = family ?? "InterRegular";

  const baseStyle: TextStyle = {
    fontSize,
    fontFamily,
    color,
    ...style,
  };

  let _style = [style, baseStyle];

  if (Array.isArray(style)) {
    style.push(baseStyle);
    _style = style.reverse();
  }

  return <TextRN {...rest} style={_style} />;
};

const getSize = (size?: fontSize) => {
  switch (size) {
    case "xSmall":
      return FONTS.FONT_SIZE_X_SMALL;
    case "small":
      return FONTS.FONT_SIZE_SMALL;
    case "large":
      return FONTS.FONT_SIZE_LARGE;
    case "xLarge":
      return FONTS.FONT_SIZE_X_LARGE;
    case "xxLarge":
      return FONTS.FONT_SIZE_XX_LARGE;
    default:
      return FONTS.FONT_SIZE_REGULAR;
  }
};

export default Text;
