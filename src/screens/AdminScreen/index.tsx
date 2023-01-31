import React from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Text, TotemCard } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTotem } from "_/hooks/useTotem";
import { TotemFromApiType } from "_/services/TotemService";

import styles from "./styles";
import { TEXTS } from "_/constants/texts";

const TotemScreen = () => {
  const { top } = useSafeAreaInsets();
  const { totems } = useTotem();

  const safeArea = { paddingTop: top } as ViewStyle;

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.titleWrapper]}>
        <Text family="InterBold" size="large" style={styles.title}>
          Meus Totens
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {totems.map((totem: TotemFromApiType, index: number) => {
          if (totem.coords.latitude && totem.coords.latitude)
            return (
              <TotemCard
                key={index}
                title={totem.title}
                style={styles.totemCard}
                totemProps={totem.totemProps}
                bottomButtonLabel={TEXTS.EDIT_TOTEM}
              />
            );
        })}
      </ScrollView>
    </View>
  );
};

export default TotemScreen;
