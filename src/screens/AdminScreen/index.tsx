import React from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Text, TotemCard } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTotem } from "_/hooks/useTotem";
import { TotemFromApiType } from "_/services/TotemService";

import styles from "./styles";

const TotemScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { totens } = useTotem();

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.titleWrapper]}>
        <Text family="InterBold" size="large" style={styles.title}>
          Meus Totens
        </Text>
      </View>
      <ScrollView>
        <View style={[styles.totens]}>
          {totens.map((totem: TotemFromApiType, index: number) => {
            if (totem.coords.latitude && totem.coords.latitude)
              return (
                <TotemCard
                  key={index}
                  style={styles.totemCard}
                  title={totem.title}
                  totemProps={totem.totemProps}
                  // onPressEditTotem={totem.onPressEditTotem}
                  isTotensScreen={true}
                />
              );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default TotemScreen;