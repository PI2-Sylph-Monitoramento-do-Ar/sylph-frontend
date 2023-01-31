import React, { useEffect, useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Text, TotemCard, FloattingButton } from "_/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTotem } from "_/hooks/useTotem";
import { TotemFromApiType } from "_/services/TotemService";

import styles from "./styles";
import { TEXTS } from "_/constants/texts";
import TotemModal from "_/components/TotemModal";

const TotemScreen = () => {
  const { top } = useSafeAreaInsets();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { totems } = useTotem();

  const safeArea = { paddingTop: top } as ViewStyle;

  return (
    <View style={[styles.container, safeArea]}>
      <View style={[styles.titleWrapper]}>
        <Text family="InterBold" size="large" style={styles.title}>
          Meus Totens
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {totems.map((totem: TotemFromApiType, index: number) => {
          if (totem.coords.latitude && totem.coords.latitude)
            return (
              <TotemCard
                key={index}
                title={totem.title}
                style={styles.totemCard}
                totemProps={totem.totemProps}
                bottomButtonLabel={TEXTS.EDIT_TOTEM}
              />
            );
        })}
      </ScrollView>
      <FloattingButton onPress={() => { setOpenModal(true) }} title="Totem" iconName="plus-one" style={styles.newTotem} isAbsolute={true} />
      {openModal && <TotemModal title="Novo Totem" modalVisible={openModal} setModalVisible={setOpenModal}/>}
    </View>
  );
};

export default TotemScreen;
