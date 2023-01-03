import { View } from "react-native";
import Icon, { IconProps } from "_/components/Icon";
import { COLORS } from "_/constants/colors";
import { styles } from "./styles";

interface TabBarIconProps {
  focused: boolean;
  name: IconProps["name"];
}

export const TabBarIcon = ({ focused, name }: TabBarIconProps) => {
  const iconColor = focused ? COLORS.WHITE : COLORS.BLACK;
  const circleColor = focused ? COLORS.PRIMARY_COLOR : COLORS.TRANPARENT;

  return (
    <View style={[styles.iconContainer, { backgroundColor: circleColor }]}>
      <Icon name={name} color={iconColor} size="large" style={styles.icon} />
    </View>
  );
};
