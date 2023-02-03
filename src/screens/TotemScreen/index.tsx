import React from "react";
import { View, ViewStyle } from "react-native";
import { AnimatedMarker, Text } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TotemFromApiType } from "_/services/TotemService";
import { AirQualityCard } from "_/components";
import MapView from "react-native-maps";
import { Platform } from "react-native";

import styles from "./styles";
import { useNavigate } from "_/hooks/useNavigate";
import { EdgeValuesNamesArray, EdgeValuesTypes } from "_/types/Totem";
import { ScrollView } from "react-native-gesture-handler";
import { IconProps } from "_/components/Icon";
import moment from "moment";

const ZOOM_VALUE = 1;
const LATITUEDE_DELTA = 0.09;
const LONGITUDE_DELTA = 0.04;

interface IMoreInfoScreen {
  totemInfo: TotemFromApiType;
}
const TotemScreen = ({ totemInfo }: IMoreInfoScreen) => {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigate();

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle;

  const mapToCard = () => {
    return [
      {
        valueName: "humidity",
        title: "Umidade",
        iconName: "cloud",
        dataType: "%",
      },
      {
        valueName: "temperature",
        title: "Temperature",
        iconName: "device-thermostat",
        dataType: "ºC",
      },
      {
        valueName: "ammonia",
        title: "NH3",
        iconName: "device-thermostat",
        dataType: "ppm",
      },
      {
        valueName: "carbon_dioxide_level",
        title: "CO2",
        iconName: "device-thermostat",
        dataType: "ppm",
      },
      {
        valueName: "carbon_monoxide_level",
        title: "CO",
        dataType: "ppm",
        iconName: "device-thermostat",
      },
      {
        valueName: "nitrogen_dioxide_level",
        title: "NO2",
        iconName: "device-thermostat",
        dataType: "ppm",
      },
      {
        valueName: "particulate_matter_level",
        title: "Partículas finas",
        dataType: "ppm",
        iconName: "device-thermostat",
      },
    ] as {
      valueName: EdgeValuesTypes;
      title: string;
      iconName: IconProps["name"];
      dataType?: string;
    }[];
  };

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
      <ScrollView style={styles.scrollView}>
        <View style={styles.cards}>
          <AirQualityCard
            dataCollected={totemInfo.totemProps.airQuality}
            titleProps={{
              title: "Qualidade do Ar",
              iconName: "device-thermostat",
            }}
            minMaxValues={{
              min: "N/A",
              max: "N/A",
            }}
            style={styles.singleCard}
          />
          {mapToCard().map((data) => (
            <AirQualityCard
              dataCollected={totemInfo.totemProps[data.valueName].current}
              minMaxValues={{
                min: totemInfo.totemProps[data.valueName]?.min,
                max: totemInfo.totemProps[data.valueName]?.max,
              }}
              titleProps={{ title: data.title, iconName: data.iconName }}
              dataType={data.dataType}
              onPressBottomButton={() =>
                navigate("Charts", {
                  title: data.title,
                  totemId: totemInfo.totemId,
                  measureName: data.valueName,
                })
              }
              style={styles.singleCard}
            />
          ))}
        </View>
        <Text family="InterRegular" size="regular" style={styles.updateText}>
          {`Dados atualizados em: ${moment(
            totemInfo.totemProps.dateTime
          ).format("DD/MM/YYYY HH:mm")}`}
        </Text>
      </ScrollView>
    </View>
  );
};

export default TotemScreen;
