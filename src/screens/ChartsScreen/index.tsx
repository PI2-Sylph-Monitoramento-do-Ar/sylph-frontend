import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, LineChart, Text } from "_/components";
import { SIZES } from "_/constants/sizes";

import styles from "./styles";

const PAGE_TITLE = "Temperatura";

const ChartsScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [hourlyValues, setHourlyValues] = useState<any>([]);
  const [dailyValues, setdailyValues] = useState<any>([]);
  const [weeklyValues, setWeeklyValues] = useState<any>([]);

  useEffect(() => {
    const data = [
      { x: "00:00", y: Math.floor(Math.random() * 10) },
      { x: "01:00", y: Math.floor(Math.random() * 10) },
      { x: "02:00", y: Math.floor(Math.random() * 10) },
      { x: "03:00", y: Math.floor(Math.random() * 10) },
      { x: "04:00", y: Math.floor(Math.random() * 10) },
      { x: "05:00", y: Math.floor(Math.random() * 10) },
      { x: "06:00", y: Math.floor(Math.random() * 10) },
      { x: "07:00", y: Math.floor(Math.random() * 10) },
      { x: "08:00", y: Math.floor(Math.random() * 10) },
      { x: "09:00", y: Math.floor(Math.random() * 10) },
      { x: "10:00", y: Math.floor(Math.random() * 10) },
      { x: "11:00", y: Math.floor(Math.random() * 10) },
      { x: "12:00", y: Math.floor(Math.random() * 10) },
    ];

    const apiData = () => Promise.resolve(data);

    (async () => {
      setWeeklyValues(await apiData());
      setHourlyValues(await apiData());
      setdailyValues(await apiData());
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <></>;
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Text
        size="xLarge"
        family="InterBold"
        style={{ alignSelf: "center", marginBottom: SIZES.MARGING_REGULAR }}
      >
        {PAGE_TITLE}
      </Text>
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
