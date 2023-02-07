import React, { useEffect, useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Text, TotemCard, FloattingButton } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTotem } from "_/hooks/useTotem";
import { TotemType } from "_/services/TotemService";

import styles from "./styles";
import { TEXTS } from "_/constants/texts";
import TotemModal from "_/components/TotemModal";

const TotemScreen = () => {
  const { top } = useSafeAreaInsets();
  const [openCreateTotemModal, setCreateTotemOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const { listTotem } = useTotem();
  const [totems, setTotems] = useState<TotemType[]>([]);
  const [selectedTotem, setSelectedTotem] = useState<TotemType>({} as TotemType);

  useEffect(() => {
    listTotem().then((totemsApi) => {
      setTotems(totemsApi);
    });
  });

  const safeArea = { paddingTop: top } as ViewStyle;

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.titleWrapper]}>
        <Text family="InterBold" size="large" style={styles.title}>
          Meus Totens
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {totems.map((totem: TotemType, index: number) => {
          if (totem.coords.latitude && totem.coords.latitude)
            return (
              <TotemCard
                key={index}
                title={totem.title}
                style={styles.totemCard}
                totemProps={totem.totemProps}
                bottomButtonLabel={TEXTS.EDIT_TOTEM}
                onPressBottomButton={() => { setSelectedTotem(totem); setOpenEditModal(true) }}
              />
            );
        })}
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
          title="Novo Totem"
          modalVisible={openCreateTotemModal}
          setModalVisible={setCreateTotemOpenModal}
          actionType="create"
        />
      )}
      {openEditModal && (
        <TotemModal
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

export default TotemScreen;
