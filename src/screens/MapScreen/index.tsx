import React, { useCallback, useEffect, useRef, useState } from "react";

import { useLocation } from "_/hooks/useLocation";
import Carousel from "react-native-reanimated-carousel";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import styles from "./styles";
import { AnimatedMarker, FloattingButton, TotemCard } from "_/components";
import { SIZES } from "_/constants/sizes";
import { useTotem } from "_/hooks/useTotem";
import { useNavigate } from "_/hooks/useNavigate";
import { TotemType } from "_/services/TotemService";
import { useLoader } from "_/hooks/useLoader";
import { useAuth } from "_/hooks/useAuth";
import { useGuest } from "_/hooks/useGuest";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CAROUSEL_PERCENTAGE_HEIGHT = 0.2;
const CAROUSEL_PERCENTAGE_WIDTH = 0.9;

const ZOOM_DELTA_MIN = 1;
const ZOOM_DELTA_MAX = 1.25;

const MapScreen = () => {
  const { position } = useLocation();
  const { setIsLoading, isLoading } = useLoader();
  const { listTotem } = useTotem();
  const [totems, setTotems] = useState<TotemType[]>([]);
  const { reset, addListener, navigate } = useNavigate();
  const { signOut: signOutAdmin, isAuthed } = useAuth();
  const { top } = useSafeAreaInsets();

  const _signOut = () => {
    if(isAuthed) signOutAdmin()
    reset({
      index: 0, 
      routes:[
       { name: "Auth" }
      ]
    })
  };

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
  }, []);

  const [zoomValue, setZoomValue] = useState(ZOOM_DELTA_MIN);

  const setZoom = useCallback(
    (region: Region) => {
      const { latitudeDelta } = region;
      if (latitudeDelta < ZOOM_DELTA_MAX && latitudeDelta > ZOOM_DELTA_MIN)
        setZoomValue(latitudeDelta);
    },
    [zoomValue]
  );

  let mapView = useRef<any>();

  const onPressMarker = (totem: TotemType) => {
    navigate("MoreInfo", totem);
  };

  const renderCarousel = useCallback(() => {
    return (
      <Carousel
        loop
        onSnapToItem={(index) => {
          if (mapView?.current && totems[index].coords) {
            mapView.current.animateToRegion(
              {
                ...totems[index].coords,
                latitudeDelta: ZOOM_DELTA_MIN / 10,
                longitudeDelta: ZOOM_DELTA_MIN / 10,
              },
              1000
            );
          }
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
    return totems.map((totem: TotemType, index: number) => {
      if (totem.coords.latitude && totem.coords.longitude)
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
    });
  }, [totems]);

  if (position.latitude && position.longitude && !isLoading)
    return (
      <>
                <FloattingButton
                      iconName="logout"
                      title="Sair"
                      style={{ ...styles.floattingButton, marginTop: top }}
                      onPress={_signOut}
                      />
          
        <MapView
          provider={PROVIDER_GOOGLE}
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
