import React from "react";
import { View, ButtonProps, TouchableOpacity, ViewStyle } from "react-native";
import Icon, { IconProps } from "../Icon";
import Text from "../Text";

import { styles } from "./styles";

interface IFloattingButton extends ButtonProps {
  iconName?: IconProps["name"];
  isAbsolute?: boolean;
  style?: ViewStyle;
  onPress?: () => void,
}

const FloattingButton = ({
  title,
  iconName,
  isAbsolute,
  style,
  onPress,
  ...rest
}: IFloattingButton) => {
  const position: ViewStyle = isAbsolute ? { position: "absolute" } : {};
  return (
    <TouchableOpacity {...rest} onPress={onPress} style={[style, position, styles.buttonBody]}>
      <View style={styles.contentBox}>
        {iconName && (
          <Icon name={iconName} style={styles.icon} color={styles.icon.color} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FloattingButton;
