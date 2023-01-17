import React, { useCallback, useState } from "react";

import { useLocation } from "_/hooks/useLocation";
import Carousel from "react-native-reanimated-carousel";
import MapView, { Region } from "react-native-maps";
import styles from "./styles";
import { AnimatedMarker, TotemCard } from "_/components";
import { TotemCardProps } from "_/components/TotemCard";
import { SIZES } from "_/constants/sizes";
import { Platform } from "react-native";
import { useTotem } from "_/hooks/useTotem";

const CAROUSEL_PERCENTAGE_HEIGHT = 0.175;
const CAROUSEL_PERCENTAGE_WIDTH = 0.9;

interface TotemFromApiType extends TotemCardProps {
  coords: {
    longitude: number;
    latitude: number;
  };
}

const ZOOM_DELTA_MIN = 1;
const ZOOM_DELTA_MAX = 1.25;

const MapScreen = () => {
  const { position } = useLocation();
  const { isLoading, totens } = useTotem();
  const [zoomValue, setZoomValue] = useState(ZOOM_DELTA_MIN);

  const setZoom = useCallback(
    (region: Region) => {
      const { latitudeDelta } = region;
      if (latitudeDelta < ZOOM_DELTA_MAX && latitudeDelta > ZOOM_DELTA_MIN)
        setZoomValue(latitudeDelta);
    },
    [zoomValue]
  );

  let mapView = React.createRef<any>();

  const renderCarousel = () => {
    return (
      <Carousel
        loop
        onSnapToItem={(index) => {
          if (mapView.current)
            mapView.current.animateToRegion(
              {
                ...totens[index].coords,
                latitudeDelta: ZOOM_DELTA_MIN,
                longitudeDelta: ZOOM_DELTA_MIN,
              },
              1000
            );
        }}
        width={SIZES.SCREEN_WIDTH * CAROUSEL_PERCENTAGE_WIDTH}
        height={SIZES.SCREEN_HEIGHT * CAROUSEL_PERCENTAGE_HEIGHT}
        style={styles.carousel}
        data={totens}
        pagingEnabled
        scrollAnimationDuration={1000}
        renderItem={({ item: { title, totemProps, onPressMoreInfo } }) => (
          <TotemCard
            style={styles.totemCard}
            title={title}
            totemProps={totemProps}
            onPressMoreInfo={onPressMoreInfo}
          />
        )}
      />
    );
  };

  if (position.latitude && position.longitude && !isLoading)
    return (
      <>
        <MapView
          provider={Platform.OS === "android" ? "google" : undefined}
          onRegionChangeComplete={setZoom}
          style={styles.container}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: ZOOM_DELTA_MIN,
            longitudeDelta: ZOOM_DELTA_MIN,
          }}
          ref={mapView}
        >
          <>
            {totens.map((totem: TotemFromApiType, index: number) => {
              if (totem.coords.latitude && totem.coords.latitude)
                return (
                  <AnimatedMarker
                    tracksViewChanges={false}
                    totemName={totem.title}
                    key={index}
                    zoomValue={zoomValue}
                    totemProps={totem.totemProps}
                    coordinate={{
                      latitude: totem.coords.latitude,
                      longitude: totem.coords.longitude,
                    }}
                  />
                );
            })}
          </>
        </MapView>
        {renderCarousel()}
      </>
    );
};

export default MapScreen;
