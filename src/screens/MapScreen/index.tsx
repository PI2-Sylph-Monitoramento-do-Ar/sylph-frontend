import React, { useCallback, useEffect, useState } from "react";

import { useLocation } from "_/hooks/useLocation";
import Carousel from "react-native-reanimated-carousel";
import MapView, { Region } from "react-native-maps";
import styles from "./styles";
import { AnimatedMarker, TotemCard } from "_/components";
import { SIZES } from "_/constants/sizes";
import { Platform } from "react-native";
import { useTotem } from "_/hooks/useTotem";
import { useNavigate } from "_/hooks/useNavigate";
import { TotemFromApiType } from "_/services/TotemService";
import { useLoader } from "_/hooks/useLoader";

const CAROUSEL_PERCENTAGE_HEIGHT = 0.2;
const CAROUSEL_PERCENTAGE_WIDTH = 0.9;

const ZOOM_DELTA_MIN = 1;
const ZOOM_DELTA_MAX = 1.25;

const MapScreen = () => {
  const { position } = useLocation();
  const { setIsLoading, isLoading } = useLoader();
  const { listTotem } = useTotem();
  const [totems, setTotems] = useState<TotemFromApiType[]>([]);
  const { navigate, addListener } = useNavigate();

  useEffect(() => {
    addListener("focus", () => {
      setIsLoading(true);
      listTotem()
        .then((value) => {
          if (value) {
            setTotems(value);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  });

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

  const onPressMarker = (totem: TotemFromApiType) => {
    navigate("MoreInfo", totem);
  };

  const renderCarousel = useCallback(() => {
    return (
      <Carousel
        loop
        onSnapToItem={(index) => {
          if (mapView.current && totems[index].coords)
            mapView.current.animateToRegion(
              {
                ...totems[index].coords,
                latitudeDelta: ZOOM_DELTA_MIN / 10,
                longitudeDelta: ZOOM_DELTA_MIN / 10,
              },
              1000
            );
        }}
        width={SIZES.SCREEN_WIDTH * CAROUSEL_PERCENTAGE_WIDTH}
        height={SIZES.SCREEN_HEIGHT * CAROUSEL_PERCENTAGE_HEIGHT}
        style={styles.carousel}
        data={totems}
        pagingEnabled
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <TotemCard
            key={index}
            style={styles.totemCard}
            title={item?.title}
            totemProps={item.totemProps}
            onPressBottomButton={() => onPressMarker(item)}
          />
        )}
      />
    );
  }, [totems]);

  const renderMarker = useCallback(() => {
    return totems.map((totem: TotemFromApiType, index: number) => {
      if (totem.coords.latitude && totem.coords.longitude)
        return (
          <AnimatedMarker
            onPress={() => onPressMarker(totem)}
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
    });
  }, [totems]);

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
          {renderMarker()}
        </MapView>
        {renderCarousel()}
      </>
    );
  return <></>;
};

export default MapScreen;
