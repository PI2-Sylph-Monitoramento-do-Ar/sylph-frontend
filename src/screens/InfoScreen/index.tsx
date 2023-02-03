import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "_/components";
import { getQualityColor } from "_/helpers/getColor";

import styles from "./styles";

const InfoScreen = () => {
  const { top } = useSafeAreaInsets();

  const colorInfo = [
    {
      value: 6,
      title: "Bom",
      text: "A qualidade do ar é considerada satisfatória e a poluição do ar representa pouco ou nenhum risco.",
    },
    {
      value: 5,
      title: "Moderado",
      text: "A qualidade do ar é aceitável; entretanto, para alguns poluentes pode haver preocupação moderada com a saúde para um número muito pequeno de pessoas excepcionalmente sensíveis à poluição do ar.",
    },
    {
      value: 4,
      title: "Inadequado",
      text: "Membros de grupos sensíveis podem apresentar problemas de saúde. O público em geral não é susceptível a ser afetado.",
    },
    {
      value: 3,
      title: "Ruim",
      text: "Todos podem apresentar problemas de saúde: membros de grupos sensíveis podem apresentar problemas mais sérios.",
    },
    {
      value: 2,
      title: "Muito Ruim",
      text: "Avisos de saúde de condições de emergência. Toda a população é susceptível.",
    },
    {
      value: 1,
      title: "Péssima",
      text: "Perigoso para toda a população. Muito perigoso.",
    },
    {
      value: 0,
      title: "Crítica",
      text: "Alerta de saúde: todos podem apresentar efeitos sérios à saúde",
    },
  ] as { value: 0 | 1 | 2 | 3 | 4 | 5 | 6; text: string; title: string }[];

  return (
    <View
      style={[styles.container, { paddingTop: top, paddingHorizontal: 20 }]}
    >
      <Text
        size="large"
        family="InterBold"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Qualidade do Ar
      </Text>
      <ScrollView>
        {colorInfo.map((data) => (
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 20,
                  justifyContent: "center",
                  backgroundColor: getQualityColor(data.value),
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFF",
                  }}
                  family="InterBold"
                >
                  {data.value}
                </Text>
              </View>
              <Text family="InterBold" style={{ alignSelf: "center" }}>
                {data.title}
              </Text>
            </View>
            <Text>{data.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
