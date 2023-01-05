import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextStyle } from "react-native";
import { SIZES } from "_/constants/sizes";

type iconSize = "xSmall" | "small" | "regular" | "large";

export interface IconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: iconSize;
  color?: string;
  style?: TextStyle;
}

const Icon = ({ name, size, style, color }: IconProps) => {
  const _size = getIconSize(size);
  return <MaterialIcons style={style} name={name} size={_size} color={color} />;
};

const getIconSize = (size?: iconSize) => {
  switch (size) {
    case "large":
      return SIZES.ICON_LARGE;
    case "small":
      return SIZES.ICON_SMALL;
    case "xSmall":
      return SIZES.ICON_X_SMALL;
    default:
      return SIZES.ICON_REGULAR;
  }
};

export default Icon;
