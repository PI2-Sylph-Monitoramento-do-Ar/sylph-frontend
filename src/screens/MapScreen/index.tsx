import React, { useEffect, useState } from "react";

import { useLocation } from "_/hooks/useLocation";
import Carousel from "react-native-reanimated-carousel";
import MapView from "react-native-maps";
import styles from "./styles";
import { TotemCard } from "_/components";
import { TotemCardProps } from "_/components/TotemCard";
import { SIZES } from "_/constants/sizes";

const MapScreen = () => {
  const { position } = useLocation();
  const [totemArray, setTotemArray] = useState<TotemCardProps[]>([]);

  useEffect(() => {
    const api = (): Promise<TotemCardProps[]> => {
      const quantity = [...new Array(10).keys()];

      const values: TotemCardProps[] = quantity.map<TotemCardProps>((_, i) => {
        const title = `Totem ${i}`;
        return {
          title,
          totemProps: {
            humidity: Math.floor(Math.random() * 90),
            temperature: Math.floor(Math.random() * 35),
            score: Math.floor(Math.random() * 10),
            locationName: "Gama",
          },
          onPressMoreInfo: () => alert(title),
        };
      });

      return Promise.resolve(values);
    };

    (async () => {
      const totems = await api();
      setTotemArray(totems);
    })();
  }, []);

  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Carousel
        loop
        width={SIZES.SCREEN_WIDTH * 0.9}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
        height={SIZES.SCREEN_HEIGHT * 0.175}
        data={totemArray}
        pagingEnabled
        scrollAnimationDuration={1000}
        renderItem={({ item: { title, totemProps, onPressMoreInfo } }) => (
          <TotemCard
            style={{ marginHorizontal: "2.5%" }}
            title={title}
            totemProps={totemProps}
            onPressMoreInfo={onPressMoreInfo}
          />
        )}
      />
    </MapView>
  );
};

export default MapScreen;
