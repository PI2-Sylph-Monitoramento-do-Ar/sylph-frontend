import React from "react";
import { Animated, View } from "react-native";
import { MapMarkerProps, Marker } from "react-native-maps";
import { getQualityColorWithOpacity } from "_/helpers/getColor";
import { TotemType } from "_/types/Totem";
import IconInfo from "../IconInfo";

import styles from "./styles";

interface AnimatedMarkerProps extends MapMarkerProps {
  totemName: string;
  totemProps: TotemType;
  zoomValue: number;
}

const AnimatedMarker = ({
  totemName,
  totemProps,
  zoomValue,
  ...rest
}: AnimatedMarkerProps) => {
  return (
    <Marker {...rest}>
      <View style={styles.transparentBox}>
        <Animated.View
          style={[
            styles.content,
            {
              backgroundColor: getQualityColorWithOpacity(
                Number(totemProps.airQuality)
              ),
              transform: [{ scaleY: zoomValue }, { scaleX: zoomValue }],
            },
          ]}
        >
          <View style={styles.markerLabelBox}>
            <IconInfo
              label={totemName}
              size="small"
              iconName="location-pin"
              style={styles.iconInfo}
            />
          </View>
        </Animated.View>
      </View>
    </Marker>
  );
};

export default AnimatedMarker;
