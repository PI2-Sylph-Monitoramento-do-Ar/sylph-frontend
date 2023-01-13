import { Dimensions, View } from "react-native";
import Icon, { IconProps } from "_/components/Icon";
import { COLORS } from "_/constants/colors";
import { SIZES } from "_/constants/sizes";
import { styles } from "./styles";

interface TabBarIconProps {
  focused: boolean;
  name: IconProps["name"];
}

export const TabBarIcon = ({ focused, name }: TabBarIconProps) => {
  const iconColor = focused ? COLORS.WHITE : COLORS.BLACK;
  const circleColor = focused ? COLORS.PRIMARY_COLOR : COLORS.TRANPARENT;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: circleColor }]}>
        <Icon name={name} color={iconColor} size="large" style={styles.icon} />
      </View>
    </View>
  );
};
