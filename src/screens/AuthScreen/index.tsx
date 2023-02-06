import React from "react";
import { View, ViewStyle } from "react-native";
import { Button, Text } from "_/components";
import { homeImage } from "_/assets/home-image";
import { SvgXml } from "react-native-svg";
import { TEXTS } from "_/constants/texts";
import { COLORS } from "_/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { useAuth } from "_/hooks/useAuth";
import { SIZES } from "_/constants/sizes";
import { useAuthPrompt } from "_/hooks/useAuthPrompt";

const AuthScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { promptAuth } = useAuthPrompt();
  const safeArea = { paddingBottom: bottom, paddingTop: top } as ViewStyle;

  const { adminLogin, guestLogin } = useAuth();

  const loginWithGoogle = async () => {
    const credential = await promptAuth();
    adminLogin(credential);
  };

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
          onPress={guestLogin}
        />
        <Button
          title="Entrar como Administrador"
          type="secondary"
          onPress={loginWithGoogle}
        />
      </View>
    </View>
  );
};

export default AuthScreen;
