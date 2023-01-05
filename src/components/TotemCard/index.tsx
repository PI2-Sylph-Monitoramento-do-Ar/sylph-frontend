import React from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS } from "_/constants/colors";
import { TEXTS } from "_/constants/texts";
import IconInfo from "../IconInfo";
import Text from "../Text";

import styles from "./styles";

interface ITotemCardProps {
  title: string;
  totemProps: {
    score: string | number;
    locationName: string;
    temperature: string | number;
    humidity: string | number;
  };
  onPressMoreInfo?: () => void;
}

const TotemCard = ({ title, totemProps, onPressMoreInfo }: ITotemCardProps) => {
  const borderColor = getCircleColor(Number(totemProps.score));

  return (
    <View style={styles.container}>
      <View style={styles.mainContentBox}>
        <View style={[styles.circle, { borderColor }]}>
          <Text family="InterBold" style={styles.scoreText} size="large">
            {totemProps.score}
          </Text>
          <Text
            style={styles.scoreMaxText}
            color={COLORS.BLACK_WITH_OPACITY}
            size="small"
          >
            de 10
          </Text>
        </View>
        <View>
          <Text family="InterBold" style={styles.title}>
            {title}
          </Text>
          <IconInfo
            label={totemProps.locationName}
            iconName="place"
            size="small"
            color={COLORS.BLACK_WITH_OPACITY}
            style={styles.locationText}
          />
          <View style={styles.valuesMeasuredBox}>
            <IconInfo
              family="InterExtraLight"
              label={`${totemProps.temperature}ºC`}
              iconName="device-thermostat"
              style={styles.valueMeasuredInfo}
              color={COLORS.BLACK}
            />
            <IconInfo
              label={`${totemProps.humidity}%`}
              iconName="cloud"
              family="InterExtraLight"
              color={COLORS.BLACK}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.moreInfoBox} onPress={onPressMoreInfo}>
        <IconInfo
          label={TEXTS.MORE_INFO}
          iconName="chevron-right"
          iconPosition="right"
          style={styles.moreInfo}
          color={COLORS.PRIMARY_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

const getCircleColor = (score: number) => {
  if (score < 5) return COLORS.BAD_AIR_COLOR;
  if (score < 8) return COLORS.REGULAR_AIR_COLOR;
  return COLORS.GOOD_AIR_COLOR;
};

export default TotemCard;
