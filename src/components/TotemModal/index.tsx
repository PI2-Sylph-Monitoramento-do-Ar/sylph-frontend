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
import { useAuth } from "_/hooks/useAuth";


export interface TotemModalProps {
  title: string,
  onPressButton?: () => void,
  modalVisible: boolean,
  setModalVisible: (modalVisible: boolean) => void,
  actionType: 'edit' | 'create';
  totem?: TotemType,
}

const TotemModal = ({
  title,
  modalVisible,
  setModalVisible,
  actionType, totem
}: TotemModalProps) => {

  const [totemName, setTotemName] = useState(totem?.name ?? '');
  const [macAddress, setMacAddress] = useState(totem?.macAddress ?? '');
  const [totemLatitude, setTotemLatitude] = useState<number>(totem?.coords.latitude ?? 0);
  const [totemLongitude, setTotemLongitude] = useState<number>(totem?.coords.longitude ?? 0);
  const { createTotem, editTotem, deleteTotem } = useTotem();
  const { adminToken } = useAuth();

  // const safeArea = { paddingTop: top, paddingBottom: bottom, paddingLeft: left, paddingRight: right } as ViewStyle;

  const handleCreateTotem = async () => {
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

    await createTotem(totem, adminToken);
    setModalVisible(!modalVisible);
  }

  const handleEditTotem = async () => {
    const _totem: TotemType = {
      id: totem?.id ?? '',
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

    await editTotem(_totem, adminToken);
    setModalVisible(!modalVisible);
  }
  const handleDeleteTotem = async() => {
    await deleteTotem(totem?.id ?? '', adminToken);
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
              defaultValue={`${totemLatitude ? totemLatitude : ''}`}
            />
          </View>
          <View style={styles.formBox}>
            <Icon name='place' color={styles.icon.color} size="small" />
            <TextInput
              style={styles.formText}
              onChangeText={longitude => setTotemLongitude(Number(longitude))}
              placeholder="Longitude"
              defaultValue={`${totemLongitude ? totemLongitude : ''}`}

            />
          </View>
          {actionType === "create" &&
            <View style={styles.buttonWrapper}>
              <Pressable style={styles.buttonCreate} onPress={handleCreateTotem}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </Pressable>
            </View>
          }
          {actionType === "edit" &&
            <View style={styles.buttonWrapperEdit}>
              <Pressable style={styles.buttonDelete} onPress={handleDeleteTotem}>
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
              <Pressable style={styles.buttonEdit} onPress={handleEditTotem}>
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>
            </View>
          }
        </View>
      </View>
    </Modal>

  );
};

export default TotemModal;
