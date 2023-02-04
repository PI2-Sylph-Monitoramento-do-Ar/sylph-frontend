import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, LineChart } from "_/components";
import { SIZES } from "_/constants/sizes";
import {
  getValuesFromToday,
  getValuesFromWeeks,
} from "_/helpers/getValueFromTime";
import { mapMeasuresToGraph } from "_/helpers/mapMeasuresToGraph";
import { useLoader } from "_/hooks/useLoader";
import { useMeasure } from "_/hooks/useMeasure";
import { useNavigate } from "_/hooks/useNavigate";
import { MeasurementKeys } from "_/types/dto/measurement";

import styles from "./styles";

export interface GraphValues {
  x: string;
  y: number;
}

export interface IChartsScreen {
  measureName: MeasurementKeys;
  totemId: string;
  title: string;
}

const ChartsScreen = ({ measureName, totemId }: IChartsScreen) => {
  const { bottom } = useSafeAreaInsets();
  const { setIsLoading, isLoading } = useLoader();
  const { goBack } = useNavigate();
  const [hourlyValues, setHourlyValues] = useState<any>([]);
  const [dailyValues, setDailyValues] = useState<any>([]);
  const [weeklyValues, setWeeklyValues] = useState<any>([]);
  const { listMeasures } = useMeasure();

  useEffect(() => {
    setIsLoading(true);
    listMeasures(totemId)
      .then((measures) => {
        if (measures) {
          const graphValues = mapMeasuresToGraph(measures, measureName);
          setHourlyValues(getValuesFromToday(graphValues));
          setDailyValues(getValuesFromWeeks(graphValues));
          setWeeklyValues(getValuesFromWeeks(graphValues, true));
        }
        setIsLoading(false);
      })
      .catch(() => {
        alert("Não foi possível recuperar dados do servidor");
        setIsLoading(false);
        goBack();
      });
  }, []);

  if (isLoading) return <></>;
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <ScrollView
        style={[{ flex: 1, paddingHorizontal: SIZES.PADDING_REGULAR }]}
      >
        <LineChart
          data={hourlyValues}
          title="Média por hora"
          timeOfMeasures="hourly"
          style={{ alignSelf: "center", marginBottom: SIZES.MARGING_XX_LARGE }}
        />
        <LineChart
          data={dailyValues}
          title="Média por dia"
          timeOfMeasures="daily"
          style={{ alignSelf: "center", marginBottom: SIZES.MARGING_XX_LARGE }}
        />
        <LineChart
          data={weeklyValues}
          title="Média por semana"
          timeOfMeasures="weekly"
          style={{ alignSelf: "center", marginBottom: SIZES.MARGING_XX_LARGE }}
        />
        <Button title="Exportar dados para planilha" />
      </ScrollView>
    </View>
  );
};

export default ChartsScreen;
