import React, { useCallback, useState } from "react";
import { View, ViewStyle } from "react-native";
import { AnimatedMarker, Text } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TotemFromApiType } from "_/services/TotemService";
import { AirQualityCard } from '_/components';
import MapView, { Region } from "react-native-maps";
import { Platform } from "react-native";


import styles from "./styles";

const ZOOM_DELTA_MIN = 1;
const ZOOM_DELTA_MAX = 1.25;
interface IMoreInfoScreen {
  totemInfo: TotemFromApiType;
}
const TotemScreen = ({ totemInfo }: IMoreInfoScreen) => {
  const { top, bottom } = useSafeAreaInsets();
  const [zoomValue, setZoomValue] = useState(ZOOM_DELTA_MIN);

  const setZoom = useCallback(
    (region: Region) => {
      const { latitudeDelta } = region;
      if (latitudeDelta < ZOOM_DELTA_MAX && latitudeDelta > ZOOM_DELTA_MIN)
        setZoomValue(latitudeDelta);
    },
    [zoomValue]
  );

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.resumeWrapper]}>
        <Text family="InterBold" size="regular" style={styles.resumeText}>
          Resumo
        </Text>
        <View style={styles.mapWrapper}>
          <MapView
            provider={Platform.OS === "android" ? "google" : undefined}
            onRegionChangeComplete={setZoom}
            style={styles.map}
            initialRegion={{
              latitude: totemInfo.coords.latitude,
              longitude: totemInfo.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <AnimatedMarker
              tracksViewChanges={false}
              totemName={totemInfo.title}
              zoomValue={zoomValue}
              totemProps={totemInfo.totemProps}
              coordinate={{
                latitude: totemInfo.coords.latitude,
                longitude: totemInfo.coords.longitude,
              }}
            />
          </MapView>
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
