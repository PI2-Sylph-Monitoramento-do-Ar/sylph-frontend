import React from "react";
import {
  View,
  Text,
  ButtonProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Icon, { IIconProps } from "../Icon";

import { styles } from "./styles";

interface IFloattingButton extends ButtonProps {
  iconName?: IIconProps["name"];
  isAbsolute?: boolean;
  style?: ViewStyle;
}

const FloattingButton = ({
  title,
  iconName,
  isAbsolute,
  style,
  ...rest
}: IFloattingButton) => {
  const position: ViewStyle = isAbsolute ? { position: "absolute" } : {};
  return (
    <TouchableOpacity {...rest} style={[style, position, styles.buttonBody]}>
      <View style={styles.contentBox}>
        {iconName && <Icon name={iconName} style={styles.icon} />}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FloattingButton;
