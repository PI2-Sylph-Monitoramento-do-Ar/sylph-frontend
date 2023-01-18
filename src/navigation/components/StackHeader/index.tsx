import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Text } from "_/components";
import { SIZES } from "_/constants/sizes";

import styles from "./styles";

interface IStackHeaderProps extends Partial<NativeStackHeaderProps> {}

const StackHeader = ({ route, navigation }: IStackHeaderProps) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation?.pop();
          }}
          style={styles.icon}
        >
          <Icon name="arrow-back" size="large" />
        </TouchableOpacity>
        <Text
          family="InterBold"
          size="large"
          style={styles.title}
          numberOfLines={1}
          clipLine
        >
          {route?.params?.title || ""}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default StackHeader;
