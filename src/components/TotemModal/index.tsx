import React, { useState } from "react";
import { Modal, Pressable, View, ViewStyle } from "react-native";
import { Text, Icon } from "_/components";
import { useTotem } from "_/hooks/useTotem";
import { TotemType } from "_/services/TotemService";

import styles from "./styles";
import { TEXTS } from "_/constants/texts";
import { IconProps } from "../Icon";
import { TextInput } from "react-native-gesture-handler";
import { uuidv4 } from "@firebase/util";
import { TotemInfo } from "_/types/Totem";


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

  const [totemName, setTotemName] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [totemLatitude, setTotemLatitude] = useState<number>(0);
  const [totemLongitude, setTotemLongitude] = useState<number>(0);
  const { createTotem } = useTotem();

  // const safeArea = { paddingTop: top, paddingBottom: bottom, paddingLeft: left, paddingRight: right } as ViewStyle;

  const handleTotem = async () => {
    const totem: TotemType = {
      id: uuidv4(),
      name: totemName,
      macAddress,
      title: totemName,
      coords: {
        latitude: totemLatitude,
        longitude: totemLongitude,
      },
      totemProps: {
        airQuality: 0,
        dateTime: new Date(),
        humidity: {
          current: 0,
          max: 0,
          min: 0,
        },
        locationName: '',
        temperature: {
          current: 0,
          max: 0,
          min: 0,
        }

      } as TotemInfo,
      }

      await createTotem(totem);
      setModalVisible(!modalVisible);
  }

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
            <TextInput
              style={styles.formText}
              onChangeText={name => setTotemName(name)}
              defaultValue={totemName}
              placeholder="Nome do Totem"
            />
          </View>
          <View style={styles.formBox}>
            <Icon name='laptop' color={styles.icon.color} size="small" />
            <TextInput
              style={styles.formText}
              onChangeText={macAddress => setMacAddress(macAddress)}
              defaultValue={macAddress}
              placeholder="Endereço MAC do Totem"
            />
          </View>
          <View style={styles.formBox}>
            <Icon name='place' color={styles.icon.color} size="small" />
            <TextInput
              style={styles.formText}
              onChangeText={latitude => setTotemLatitude(Number(latitude))}
              placeholder="Latitude"
            />
          </View>
          <View style={styles.formBox}>
            <Icon name='place' color={styles.icon.color} size="small" />
            <TextInput
              style={styles.formText}
              onChangeText={longitude => setTotemLongitude(Number(longitude))}
              placeholder="Latitude"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.button} onPress={handleTotem}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

  );
};

export default TotemModal;
