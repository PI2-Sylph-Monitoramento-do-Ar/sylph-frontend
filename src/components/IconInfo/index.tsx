import React from "react";
import { View, ViewStyle } from "react-native";
import { FontsAvailableType } from "_/hooks/useFonts";
import Icon, { IconProps } from "../Icon";
import Text, { fontSize } from "../Text";

import styles from "./styles";

type IconInfoSize = "small" | "regular";
type IconPositionType = "left" | "right";

interface IIconInfoProps {
  label: string | number;
  iconName: IconProps["name"];
  family?: FontsAvailableType;
  color?: string;
  size?: IconInfoSize;
  style?: ViewStyle;
  iconPosition?: IconPositionType;
}

const IconInfo = ({
  label,
  iconName,
  color,
  style,
  family,
  size = "regular",
  iconPosition = "left",
}: IIconInfoProps) => {
  const iconSize: IconProps["size"] = size === "small" ? "xSmall" : "small";
  const labelSize: fontSize = size === "small" ? "xSmall" : "small";

  return (
    <View style={[style, styles.container]}>
      {iconPosition === "left" && (
        <Icon
          size={iconSize}
          name={iconName}
          color={color}
          style={styles.iconLeft}
        />
      )}
      <Text
        clipLine
        numberOfLines={1}
        family={family || "InterBold"}
        size={labelSize}
        color={color}
      >
        {label}
      </Text>
      {iconPosition !== "left" && (
        <Icon
          size={iconSize}
          name={iconName}
          color={color}
          style={styles.iconRight}
        />
      )}
    </View>
  );
};

export default IconInfo;
