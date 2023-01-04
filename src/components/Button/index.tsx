import React from "react";
import { ButtonProps, TouchableOpacity, ViewStyle } from "react-native";
import Text from "../Text";

import { baseStyles, primaryStyles, secondaryStyles } from "./styles";

interface IButtonProps extends ButtonProps {
  type?: "primary" | "secondary";
  style?: ViewStyle;
}

const Button = ({ style, type, title, disabled, ...rest }: IButtonProps) => {
  const buttonStyles = type === "secondary" ? secondaryStyles : primaryStyles;
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[
        style,
        baseStyles.buttonBody,
        buttonStyles.buttonBody,
        { opacity },
      ]}
    >
      <Text style={[baseStyles.title, buttonStyles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
