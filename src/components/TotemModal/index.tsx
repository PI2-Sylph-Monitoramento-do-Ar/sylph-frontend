import React from "react";
import { Button, Modal, Pressable, ScrollView, View, ViewStyle } from "react-native";
import { Text, TotemCard, FloattingButton, Icon } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTotem } from "_/hooks/useTotem";
import { TotemFromApiType } from "_/services/TotemService";

import styles from "./styles";
import { TEXTS } from "_/constants/texts";
import { TotemType } from "_/types/Totem";
import { IconProps } from "../Icon";


export interface TotemModalProps {
  title: string;
  onPressCloseButton?: () => void;
  onPressButton?: () => void;
  style?: ViewStyle;
  iconName?: IconProps["name"];
  modalVisible: boolean,
  setModalVisible: (modalVisible: boolean) => void
}

const TotemModal = ({
  title,
  onPressCloseButton,
  style,
  iconName,
  modalVisible,
  setModalVisible
}: TotemModalProps) => {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const { totens } = useTotem();

  // const safeArea = { paddingTop: top, paddingBottom: bottom, paddingLeft: left, paddingRight: right } as ViewStyle;


  return (
    <Modal transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.backButton} onPress={() => { setModalVisible(!modalVisible); }}>
              <Text style={styles.backText}>X</Text>
            </Pressable>
          </View>
          <View style={styles.formBox}>
            <Icon name='edit' color={styles.icon.color} size="small" />
            <Text style={styles.formText}>Nome do Totem</Text>
          </View>
          <View style={styles.formBox}>
            <Icon name='laptop' color={styles.icon.color} size="small" />
            <Text style={styles.formText}>Endereço MAC do Totem</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

  );
};

export default TotemModal;
