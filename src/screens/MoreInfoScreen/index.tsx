import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "_/components";
import { useNavigate } from "_/hooks/useNavigate";
import { TotemFromApiType } from "_/services/TotemService";

import styles from "./styles";

interface IMoreInfoScreen {
  totemInfo: TotemFromApiType;
}

const MoreInfoScreen = ({ totemInfo }: IMoreInfoScreen) => {
  const { navigate } = useNavigate();

  return (
    <View style={styles.container}>
      <Text>MoreInfoScreen</Text>
      <Button
        title="Temperatura"
        onPress={() => {
          navigate("Charts", { title: "Temperatura" });
        }}
      />
    </View>
  );
};

export default MoreInfoScreen;
