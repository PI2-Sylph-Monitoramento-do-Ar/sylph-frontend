import React from "react";
import { View, ViewStyle } from "react-native";
import { Button, Text } from "_/components";
import { homeImage } from "_/assets/home-image";
import { SvgXml } from "react-native-svg";
import { TEXTS } from "_/constants/texts";
import { COLORS } from "_/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AirQualityCard } from '_/components';

import styles from "./styles";

const TotemScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle

  return (
    <View style={[styles.container, safeArea]}>
      <View>
        <Text family="InterBold" size="large" style={styles.totemTitle}>
          Totem 1
        </Text>
        <Text family="InterBold" size="regular" style={styles.resumText}>
          Resumo
        </Text>
      </View>
      <AirQualityCard
        dataCollected={30}
        minMaxValues={{ min: 15, max: 40 }}
        titleProps={{ title: 'Temperatura', iconName: 'device-thermostat' }}
        dataType="%"
        />
      <View>

      </View>
    </View>
  );
};

export default TotemScreen;
