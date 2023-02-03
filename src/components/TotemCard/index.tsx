import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { COLORS } from "_/constants/colors";
import { TEXTS } from "_/constants/texts";
import { getQualityColor } from "_/helpers/getColor";
import { TotemInfo } from "_/types/Totem";
import IconInfo from "../IconInfo";
import Text from "../Text";

import styles from "./styles";

export interface TotemCardProps {
  title: string;
  totemProps: TotemInfo;
  bottomButtonLabel?: string;
  onPressBottomButton?: () => void;
  style?: ViewStyle;
}

const TotemCard = ({
  title,
  totemProps,
  bottomButtonLabel,
  onPressBottomButton,
  style,
}: TotemCardProps) => {
  const borderColor = getQualityColor(Number(totemProps.airQuality));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.mainContentBox}>
        <View style={[styles.circle, { borderColor }]}>
          <Text family="InterBold" style={styles.scoreText} size="large">
            {totemProps.airQuality}
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
              label={`${totemProps.temperature.current ?? 0}ºC`}
              iconName="device-thermostat"
              style={styles.valueMeasuredInfo}
              color={COLORS.BLACK}
            />
            <IconInfo
              label={`${totemProps.humidity.current ?? 0}%`}
              iconName="cloud"
              family="InterExtraLight"
              color={COLORS.BLACK}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.moreInfoBox}
        onPress={onPressBottomButton}
      >
        <IconInfo
          label={bottomButtonLabel || TEXTS.MORE_INFO}
          iconName="edit"
          iconPosition="right"
          style={styles.moreInfo}
          color={COLORS.PRIMARY_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TotemCard;
