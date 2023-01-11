import React from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import styles from "./styles";
import { useLocation } from "_/hooks/useLocation";

const MapScreen = () => {
  const { position } = useLocation();

  if (!(position?.latitude && position?.longitude)) return <></>;
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default MapScreen;
