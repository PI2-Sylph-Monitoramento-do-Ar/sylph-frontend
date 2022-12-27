import React from "react";
import { Text, ButtonProps, TouchableOpacity } from "react-native";

import { baseStyles, primaryStyles, secondaryStyles } from "./styles";

interface IButtonProps extends ButtonProps {
  type?: "primary" | "secondary";
}

const Button = ({ type, title, ...rest }: IButtonProps) => {
  const buttonStyles = type === "secondary" ? secondaryStyles : primaryStyles;

  return (
    <TouchableOpacity
      {...rest}
      style={[baseStyles.buttonBody, buttonStyles.buttonBody]}
    >
      <Text style={[baseStyles.title, buttonStyles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
