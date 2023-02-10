import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, LineChart } from "_/components";
import { SIZES } from "_/constants/sizes";
import { saveCsvFile } from "_/helpers/saveCsvFile";
import {
  getValuesFromToday,
  getValuesFromWeeks,
} from "_/helpers/getValueFromTime";
import { mapMeasuresToGraph } from "_/helpers/mapMeasuresToGraph";
import { useLoader } from "_/hooks/useLoader";
import { useMeasure } from "_/hooks/useMeasure";
import { useNavigate } from "_/hooks/useNavigate";
import { MeasurementDtoKeys } from "_/types/dto/measurement";

import styles from "./styles";

export interface GraphValues {
  x: string;
  y: number;
}

export interface IChartsScreen {
  measureName: MeasurementDtoKeys;
  id: string;
  title: string;
}

const ChartsScreen = ({ measureName, id, title }: IChartsScreen) => {
  const { bottom } = useSafeAreaInsets();
  const { setIsLoading, isLoading } = useLoader();
  const { goBack } = useNavigate();
  const [hourlyValues, setHourlyValues] = useState<any>([]);
  const [dailyValues, setDailyValues] = useState<any>([]);
  const [weeklyValues, setWeeklyValues] = useState<any>([]);
  const { listMeasures, downloadCsv } = useMeasure();

  useEffect(() => {
    setIsLoading(true);
    listMeasures(id)
      .then((measuresData) => {
        if (measuresData) {
          const graphValues = mapMeasuresToGraph(measuresData, measureName);
          setHourlyValues(getValuesFromToday(graphValues).reverse());
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

  const handleExportData = async () => {
    const data = await downloadCsv(id);
    saveCsvFile(data!, title);
  };
  if (isLoading) return <></>;
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <ScrollView
        style={[{ flex: 1, paddingHorizontal: SIZES.PADDING_REGULAR }]}
      >
        <LineChart
          data={hourlyValues}
          title="Valores pontuais"
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
        <Button
          title="Exportar dados para planilha"
          onPress={handleExportData}
        />
      </ScrollView>
    </View>
  );
};

export default ChartsScreen;
