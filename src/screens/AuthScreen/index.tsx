import React from "react";
import { View, ViewStyle } from "react-native";
import { Button, Text } from "_/components";
import { homeImage } from "_/assets/home-image";
import { SvgXml } from "react-native-svg";
import { TEXTS } from "_/constants/texts";
import { COLORS } from "_/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";

const AuthScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle;

  return (
    <View style={[styles.container, safeArea]}>
      <View>
        <Text
          family="NunitoBold"
          size="xxLarge"
          color={COLORS.PRIMARY_COLOR}
          style={styles.baseText}
        >
          Sylph
        </Text>
        <Text family="NunitoRegular" size="large" style={styles.baseText}>
          Monitoramento de ar
        </Text>
        <SvgXml xml={homeImage} style={styles.image} />
        <Text family="InterBold" size="xLarge" style={styles.welcomeTitle}>
          Temperatura{"\n"}
          Humidade{"\n"}
          Qualidade do Ar
        </Text>
        <Text style={styles.welcomeText}>{TEXTS.WELCOME}</Text>
      </View>
      <View>
        <Button title="Entrar como Visitante" style={styles.mainButton} />
        <Button title="Entrar como Administrador" type="secondary" />
      </View>
    </View>
  );
};

export default AuthScreen;
