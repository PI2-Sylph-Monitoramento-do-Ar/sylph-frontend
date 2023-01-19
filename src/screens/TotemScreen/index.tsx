import React from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TotemFromApiType } from "_/services/TotemService";
import { AirQualityCard } from '_/components';
import MapView from "react-native-maps";

import styles from "./styles";

interface IMoreInfoScreen {
  totemInfo: TotemFromApiType;
}
const TotemScreen = ({ totemInfo }: IMoreInfoScreen) => {
  const { top, bottom } = useSafeAreaInsets();
  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.resumeWrapper]}>
        <Text family="InterBold" size="regular" style={styles.resumeText}>
          Resumo
        </Text>
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: totemInfo.coords.latitude,
              longitude: totemInfo.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
      <View>
        <View style={[styles.cards]}>
          <AirQualityCard
            dataCollected={totemInfo.totemProps.temperature.actual}
            minMaxValues={{ min: totemInfo.totemProps.temperature.min, max: totemInfo.totemProps.temperature.max }}
            titleProps={{ title: 'Temperatura', iconName: 'device-thermostat' }}
            dataType="%"
          />
          <AirQualityCard
            dataCollected={totemInfo.totemProps.humidity.actual}
            minMaxValues={{ min: totemInfo.totemProps.humidity.min, max: totemInfo.totemProps.humidity.max }}
            titleProps={{ title: 'Umidade', iconName: 'cloud' }}
            dataType="%"
          />
        </View>
        <View style={[styles.cards]}>
          <AirQualityCard
            dataCollected={totemInfo.totemProps.airQuality}
            // minMaxValues={{ min: 30, max: 90 }}
            titleProps={{ title: 'Qualidade do ar', iconName: 'attractions' }}
            dataType="%"
          />
        </View>
        <Text family="InterRegular" size="regular" style={styles.updateText}>
          Dados atualizados em: 15/11/2022 12:15
        </Text>
      </View>
    </View>
  );
};

export default TotemScreen;
