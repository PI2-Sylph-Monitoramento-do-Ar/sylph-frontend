import React from "react";
import { View, TouchableOpacity, ViewProps } from "react-native";
import { TEXTS } from "_/constants/texts";
import Icon, { IconProps } from "../Icon";
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
  minMaxValues: minMaxValuesType;
  dataType?: string;
  onPressMoreInfo: () => void;
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
        <Icon
          size="small"
          name={titleProps.iconName}
          style={styles.titleIcon}
        />
        <Text style={styles.title}>{titleProps.title}</Text>
      </View>
      <Text style={styles.dataText}>
        {String(dataCollected)}
        {dataCollectedType}
      </Text>
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
      <TouchableOpacity style={styles.moreInfoBox} onPress={onPressMoreInfo}>
        <Text style={styles.moreInfoText}>{TEXTS.MORE_INFO}</Text>
        <Icon
          size="small"
          name="chevron-right"
          color={styles.moreInfoIcon.color}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AirQualityCard;
