import React, { useEffect, useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Text, TotemCard, FloattingButton } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTotem } from "_/hooks/useTotem";
import { TotemType } from "_/services/TotemService";

import styles from "./styles";
import { TEXTS } from "_/constants/texts";
import TotemModal from "_/components/TotemModal";
import { useAuth } from "_/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useLoader } from "_/hooks/useLoader";

const AdminScreen = () => {
  const { top } = useSafeAreaInsets();
  const [totems, setTotems] = useState<TotemType[]>([]);
  const [openCreateTotemModal, setCreateTotemOpenModal] =
    useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const { listTotem } = useTotem();
  const { setIsLoading } = useLoader();
  const { adminUser } = useAuth();
  const { addListener } = useNavigation();
  const [selectedTotem, setSelectedTotem] = useState<TotemType>(
    {} as TotemType
  );

  const getAllTotems = () => {
    setIsLoading(true);
    listTotem()
      .then((totemsApi) => {
        const totems = totemsApi.filter((totem) => totem.email === adminUser?.email);
        setTotems(totems);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    addListener("focus", () => {
      getAllTotems();
    });
  }, []);

  const safeArea = { paddingTop: top } as ViewStyle;

  const renderTotems = () => {
    if (totems.length > 0)
      return totems.map((totem: TotemType, index: number) => {
        if (totem.coords.latitude && totem.coords.latitude)
          return (
            <TotemCard
              key={index}
              title={totem.title}
              style={styles.totemCard}
              totemProps={totem.totemProps}
              bottomButtonLabel={TEXTS.EDIT_TOTEM}
              onPressBottomButton={() => {
                setSelectedTotem(totem);
                setOpenEditModal(true);
              }}
            />
          );
      });
    return (
      <Text style={{ alignSelf: "center" }} family="InterBlack">
        Não há nenhum totem no seu nome
      </Text>
    );
  };

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.titleWrapper]}>
        <Text family="InterBold" size="large" style={styles.title}>
          Meus Totens
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {renderTotems()}
      </ScrollView>
      <FloattingButton
        onPress={() => {
          setCreateTotemOpenModal(true);
        }}
        title="Totem"
        iconName="add"
        style={styles.newTotem}
        isAbsolute={true}
      />
      {openCreateTotemModal && (
        <TotemModal
          onClose={getAllTotems}
          title="Novo Totem"
          modalVisible={openCreateTotemModal}
          setModalVisible={setCreateTotemOpenModal}
          actionType="create"
        />
      )}
      {openEditModal && (
        <TotemModal
          onClose={getAllTotems}
          title="Editar Totem"
          modalVisible={openEditModal}
          setModalVisible={setOpenEditModal}
          actionType="edit"
          totem={selectedTotem}
        />
      )}
    </View>
  );
};

export default AdminScreen;
