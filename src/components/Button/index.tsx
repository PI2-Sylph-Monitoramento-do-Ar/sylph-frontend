import React from "react";
import { Text, ButtonProps, TouchableOpacity } from "react-native";

import { baseStyles, primaryStyles, secondaryStyles } from "./styles";

interface IButtonProps extends ButtonProps {
  type?: "primary" | "secondary";
}

const Button = ({ type, title, disabled, ...rest }: IButtonProps) => {
  const buttonStyles = type === "secondary" ? secondaryStyles : primaryStyles;
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[baseStyles.buttonBody, buttonStyles.buttonBody, { opacity }]}
    >
      <Text style={[baseStyles.title, buttonStyles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
