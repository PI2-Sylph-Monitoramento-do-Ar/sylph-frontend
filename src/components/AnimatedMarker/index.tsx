import React from "react";
import { Animated, View } from "react-native";
import { MapMarkerProps, Marker } from "react-native-maps";
import { getQualityColorWithOpacity } from "_/helpers/getColor";
import IconInfo from "../IconInfo";
import { TotemPropsType } from "../TotemCard";

import styles from "./styles";

interface AnimatedMarkerProps extends MapMarkerProps {
  totemName: string;
  totemProps: TotemPropsType;
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
      <Animated.View
        style={[
          styles.content,
          {
            justifyContent: "center",
            backgroundColor: getQualityColorWithOpacity(
              Number(totemProps.score)
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
    </Marker>
  );
};

export default AnimatedMarker;
