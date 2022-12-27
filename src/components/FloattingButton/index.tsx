import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  ButtonProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { SIZES } from "_/constants/sizes";

import { styles } from "./styles";

interface IFloattingButton extends ButtonProps {
  name?: keyof typeof MaterialIcons.glyphMap;
  isAbsolute?: boolean;
}

const FloattingButton = ({
  title,
  name,
  isAbsolute,
  style,
  ...rest
}: IFloattingButton) => {
  const position: ViewStyle = isAbsolute ? { position: "absolute" } : {};
  return (
    <TouchableOpacity {...rest} style={[style, position, styles.buttonBody]}>
      <View style={styles.contentBox}>
        {name && (
          <MaterialIcons
            name={name}
            size={SIZES.ICON_REGULAR}
            style={styles.icon}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FloattingButton;
