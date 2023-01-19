import React from "react";
import { View, TouchableOpacity, ViewProps } from "react-native";
import { COLORS } from "_/constants/colors";
import { TEXTS } from "_/constants/texts";
import Icon, { IconProps } from "../Icon";
import IconInfo from "../IconInfo";
import Text from "../Text";

import styles from "./styles";

type titleProps = {
  title: string;
  iconName: IconProps["name"];
};

type minMaxValuesType = {
  min: number;
  max: number;
};

interface IAirQualityCardProps extends ViewProps {
  titleProps: titleProps;
  dataCollected: number;
  minMaxValues?: minMaxValuesType;
  dataType?: string;
  onPressMoreInfo?: () => void;
}

const AirQualityCard = ({
  dataCollected,
  minMaxValues,
  titleProps,
  dataType,
  onPressMoreInfo,
  style,
  ...rest
}: IAirQualityCardProps) => {
  const dataCollectedType = dataType || "";

  return (
    <View {...rest} style={[style, styles.cardBody]}>
      <View style={styles.titleBox}>
        <IconInfo
          label={titleProps.title}
          iconName={titleProps.iconName}
          color={COLORS.BLACK_WITH_OPACITY}
        />
      </View>
      <Text style={styles.dataText}>
        {String(dataCollected)}
        {dataCollectedType}
      </Text>
      {minMaxValues &&
        <View style={styles.minMaxBox}>
          <Text style={styles.minMaxText}>
            Máx: {minMaxValues.max}
            {dataType}
          </Text>
          <Text style={styles.minMaxText}>
            Min: {minMaxValues.min}
            {dataType}
          </Text>
        </View>
      }
      <TouchableOpacity style={styles.moreInfoBox} onPress={onPressMoreInfo}>
        <IconInfo
          label={TEXTS.MORE_INFO}
          iconName={"chevron-right"}
          style={styles.infoIcon}
          color={COLORS.PRIMARY_COLOR}
          iconPosition="right"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AirQualityCard;
