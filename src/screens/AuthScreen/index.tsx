import React from "react";
import { View, ViewStyle } from "react-native";
import { Button, Text } from "_/components";
import { homeImage } from "_/assets/home-image";
import { SvgXml } from "react-native-svg";
import { TEXTS } from "_/constants/texts";
import { COLORS } from "_/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { SIZES } from "_/constants/sizes";
import { useNavigate } from "_/hooks/useNavigate";

const AuthScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle;
  const { navigate } = useNavigate();

  const goToGuestScreen = () => {
    navigate("Main")
  }

  const goToAdminAuth = () => {
    navigate("Auth", { screen: "AdminAuth" })
  }

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
        <SvgXml
          xml={homeImage}
          height={SIZES.SCREEN_HEIGHT * 0.2}
          style={styles.image}
        />
        <Text family="InterBold" size="xLarge" style={styles.welcomeTitle}>
          Temperatura{"\n"}
          Umidade{"\n"}
          Qualidade do Ar
        </Text>
        <Text style={styles.welcomeText}>{TEXTS.WELCOME}</Text>
      </View>
      <View style={styles.buttonBox}>
        <Button
          title="Entrar como Visitante"
          style={styles.mainButton}
          onPress={goToGuestScreen}
        />
        <Button
          title="Entrar como Administrador"
          type="secondary"
          onPress={goToAdminAuth}
        />
      </View>
    </View>
  );
};

export default AuthScreen;
