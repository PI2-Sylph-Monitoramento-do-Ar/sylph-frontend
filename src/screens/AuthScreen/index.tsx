import React from "react";
import { View, Text } from "react-native";
import { Button } from "_/components";

import styles from "./styles";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Button title="Autenticar" />
    </View>
  );
};

export default AuthScreen;
