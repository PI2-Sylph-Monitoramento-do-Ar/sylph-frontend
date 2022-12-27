import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ViewStyle } from "react-native";
import { SIZES } from "_/constants/sizes";

type iconSize = "small" | "regular" | "large";

export interface IIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: iconSize;
  color?: string;
  style?: ViewStyle;
}

const Icon = ({ name, size, style }: IIconProps) => {
  const _size = getIconSize(size);
  return <MaterialIcons style={style} name={name} size={_size} />;
};

const getIconSize = (size?: iconSize) => {
  switch (size) {
    case "large":
      return SIZES.ICON_LARGE;
    case "small":
      return SIZES.ICON_SMALL;
    default:
      return SIZES.ICON_REGULAR;
  }
};

export default Icon;
