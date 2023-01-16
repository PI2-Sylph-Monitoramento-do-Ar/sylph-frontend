import React from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AirQualityCard } from '_/components';
import MapView from "react-native-maps";

import styles from "./styles";

const TotemScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.resumeWrapper]}>
        <Text family="InterBold" size="large" style={styles.totemTitle}>
          Totem 1
        </Text>
        <Text family="InterBold" size="regular" style={styles.resumeText}>
          Resumo
        </Text>
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -15.98961, //será as coordenadas do totem
              longitude: -48.0443975,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
      <View>
        <View style={[styles.cards]}>
          <AirQualityCard
            dataCollected={30}
            minMaxValues={{ min: 15, max: 40 }}
            titleProps={{ title: 'Temperatura', iconName: 'device-thermostat' }}
            dataType="%"
          />
          <AirQualityCard
            dataCollected={90}
            minMaxValues={{ min: 60, max: 95 }}
            titleProps={{ title: 'Umidade', iconName: 'cloud' }}
            dataType="%"
          />
        </View>
        <View style={[styles.cards]}>
          <AirQualityCard
            dataCollected={65}
            minMaxValues={{ min: 30, max: 90 }}
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
