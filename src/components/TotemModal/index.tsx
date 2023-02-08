import React, { useCallback, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { Text, Icon } from "_/components";
import { useTotem } from "_/hooks/useTotem";
import { TotemType } from "_/services/TotemService";

import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
import { TotemInfo } from "_/types/Totem";
import { useAuth } from "_/hooks/useAuth";
import { macAddressMask } from "_/helpers/macAddressMask";
import { useLocation } from "_/hooks/useLocation";
import { useLoader } from "_/hooks/useLoader";

export interface TotemModalProps {
  title: string;
  onPressButton?: () => void;
  onClose: () => void;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  actionType: "edit" | "create";
  totem?: TotemType;
}

const TotemModal = ({
  title,
  modalVisible,
  setModalVisible,
  actionType,
  onClose,
  totem,
}: TotemModalProps) => {
  const [totemName, setTotemName] = useState(totem?.name ?? "");
  const [macAddress, setMacAddress] = useState(totem?.macAddress ?? "");
  const { position } = useLocation();
  const { setIsLoading } = useLoader();
  const { email } = useAuth();

  const [totemLatitude, setTotemLatitude] = useState<number>(
    totem?.coords.latitude ?? position.latitude
  );
  const [totemLongitude, setTotemLongitude] = useState<number>(
    totem?.coords.longitude ?? position.longitude
  );

  const { createTotem, editTotem, deleteTotem } = useTotem();
  const { adminToken } = useAuth();

  const handleCreateTotem = async () => {
    const totem: TotemType = {
      id: macAddress,
      email,
      name: totemName,
      macAddress,
      title: totemName,
      coords: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
      totemProps: {
        airQuality: 0,
        dateTime: new Date(),
        humidity: {
          current: 0,
          max: 0,
          min: 0,
        },
        locationName: "",
        temperature: {
          current: 0,
          max: 0,
          min: 0,
        },
      } as TotemInfo,
    };
    setIsLoading(true);
    await createTotem(totem, adminToken);
    setIsLoading(false);
    setModalVisible(!modalVisible);
    onClose();
  };

  const handleEditTotem = async () => {
    const _totem: TotemType = {
      id: totem?.id ?? "",
      name: totemName,
      email,
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
        locationName: "",
        temperature: {
          current: 0,
          max: 0,
          min: 0,
        },
      } as TotemInfo,
    };

    setIsLoading(true);
    await editTotem(_totem, adminToken);
    setIsLoading(false);
    setModalVisible(!modalVisible);
    onClose();
  };

  const handleDeleteTotem = async () => {
    setIsLoading(true);
    await deleteTotem(totem?.id ?? "", adminToken);
    setIsLoading(false);
    setModalVisible(!modalVisible);
    onClose();
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.title}>{title}</Text>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.backText}>X</Text>
            </Pressable>
          </View>
          <View style={styles.formBox}>
            <Icon name="edit" color={styles.icon.color} size="small" />
            <TextInput
              style={styles.formText}
              onChangeText={(name) => setTotemName(name)}
              defaultValue={totemName}
              placeholder="Nome do Totem"
            />
          </View>
          <View style={styles.formBox}>
            <Icon name="laptop" color={styles.icon.color} size="small" />
            <TextInput
              style={styles.formText}
              onChangeText={(macAddress) =>
                setMacAddress(macAddressMask(macAddress))
              }
              maxLength={17}
              defaultValue={macAddress}
              placeholder="Endereço MAC do Totem"
            />
          </View>
          <View style={styles.formBox}>
            <Icon name="place" color={styles.icon.color} size="small" />
            <TextInput
              editable={false}
              style={styles.formText}
              onChangeText={(latitude) => setTotemLatitude(Number(latitude))}
              placeholder="Latitude"
              defaultValue={`${totemLatitude ? totemLatitude : ""}`}
            />
          </View>
          <View style={styles.formBox}>
            <Icon name="place" color={styles.icon.color} size="small" />
            <TextInput
              editable={false}
              style={styles.formText}
              onChangeText={(longitude) => setTotemLongitude(Number(longitude))}
              placeholder="Longitude"
              defaultValue={`${totemLongitude ? totemLongitude : ""}`}
            />
          </View>
          {actionType === "create" && (
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[
                  styles.buttonCreate,
                  { opacity: !(macAddress && totemName) ? 0.5 : 1 },
                ]}
                onPress={handleCreateTotem}
                disabled={!(macAddress && totemName)}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </Pressable>
            </View>
          )}
          {actionType === "edit" && (
            <View style={styles.buttonWrapperEdit}>
              <Pressable
                style={styles.buttonDelete}
                onPress={handleDeleteTotem}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.buttonEdit,
                  { opacity: !(macAddress && totemName) ? 0.5 : 1 },
                ]}
                onPress={handleEditTotem}
                disabled={!(macAddress && totemName)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default TotemModal;
