import React from "react";
import { View, ViewStyle } from "react-native";
import { AnimatedMarker, Text } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TotemType } from "_/services/TotemService";
import { AirQualityCard } from "_/components";
import MapView from "react-native-maps";
import { Platform } from "react-native";

import styles from "./styles";
import { useNavigate } from "_/hooks/useNavigate";

const ZOOM_VALUE = 1;
const LATITUEDE_DELTA = 0.09;
const LONGITUDE_DELTA = 0.04;

interface IMoreInfoScreen {
  totemInfo: TotemType;
}
const TotemScreen = ({ totemInfo }: IMoreInfoScreen) => {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigate();

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle;

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.resumeWrapper]}>
        <Text family="InterBold" size="regular" style={styles.resumeText}>
          Resumo
        </Text>
        <View style={styles.mapWrapper}>
          <MapView
            pitchEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            provider={Platform.OS === "android" ? "google" : undefined}
            style={styles.map}
            initialRegion={{
              latitude: totemInfo.coords.latitude,
              longitude: totemInfo.coords.longitude,
              latitudeDelta: LATITUEDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <AnimatedMarker
              tracksViewChanges={false}
              zoomValue={ZOOM_VALUE}
              totemName={totemInfo.title}
              totemProps={totemInfo.totemProps}
              coordinate={{
                latitude: totemInfo.coords.latitude,
                longitude: totemInfo.coords.longitude,
              }}
            />
          </MapView>
        </View>
      </View>
      <View style={styles.cards}>
        <AirQualityCard
          dataCollected={totemInfo.totemProps.temperature.current}
          minMaxValues={{
            min: totemInfo.totemProps.temperature.min,
            max: totemInfo.totemProps.temperature.max,
          }}
          titleProps={{ title: "Temperatura", iconName: "device-thermostat" }}
          dataType="%"
          onPressBottomButton={() =>
            navigate("Charts", { title: "Temperatura" })
          }
        />
        <AirQualityCard
          dataCollected={totemInfo.totemProps.humidity.current}
          minMaxValues={{
            min: totemInfo.totemProps.humidity.min,
            max: totemInfo.totemProps.humidity.max,
          }}
          titleProps={{ title: "Umidade", iconName: "cloud" }}
          dataType="%"
          onPressBottomButton={() => navigate("Charts", { title: "Umidade" })}
        />
      </View>
      <View style={[styles.cards]}>
        <AirQualityCard
          dataCollected={totemInfo.totemProps.airQuality}
          titleProps={{ title: "Qualidade do ar", iconName: "attractions" }}
          dataType="%"
          onPressBottomButton={() =>
            navigate("Charts", { title: "Qualidade do ar" })
          }
        />
      </View>
      {/* <Text family="InterRegular" size="regular" style={styles.updateText}>
        Dados atualizados em: 15/11/2022 12:15
      </Text> */}
    </View>
  );
};

export default TotemScreen;
