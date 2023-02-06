import React from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";
import { SIZES } from "_/constants/sizes";
import { COLORS } from "_/constants/colors";
import { View, ViewStyle } from "react-native";
import { styles } from "./styles";
import Text from "../Text";

const CHART_SIZE = 300;

export interface LineChartData {
  data: DataType[];
  timeOfMeasures?: time;
  style?: ViewStyle;
  title: string;
}

type time = "hourly" | "daily" | "weekly";

interface DataType {
  x: number | string;
  y: number;
}

const LineChart = ({ timeOfMeasures, data, title, style }: LineChartData) => {
  const interpolation =
    timeOfMeasures === "hourly" || !timeOfMeasures ? undefined : "natural";

  const edgeValues = getEdgeValues(data);

  const renderChart = () => (
    <VictoryChart
      domain={{
        x: [1, data.length],
        y: [edgeValues.min - 0.5, edgeValues.max + 0.5],
      }}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryZoomContainer
          allowZoom={false}
          zoomDimension="x"
          zoomDomain={{
            x: [1, 3],
          }}
        />
      }
      width={SIZES.SCREEN_WIDTH * 0.8}
      height={CHART_SIZE}
    >
      <VictoryLine
        interpolation={interpolation}
        style={{
          data: { stroke: COLORS.GREY_PRIMARY },
        }}
        data={data}
      />
      <VictoryArea
        interpolation={interpolation}
        style={{ data: { fill: COLORS.GREY_SECONDARY } }}
        data={data}
      />
      <VictoryScatter
        data={data}
        size={5}
        style={{ data: { fill: COLORS.BLACK_WITH_OPACITY } }}
      />
    </VictoryChart>
  );

  const renderNoData = () => (
    <View
      style={{
        width: SIZES.SCREEN_WIDTH * 0.8,
        justifyContent: "center",
        alignContent: "center",
        height: CHART_SIZE,
        paddingHorizontal: SIZES.PADDING_X_LARGE,
      }}
    >
      <Text style={{ alignSelf: "center" }} family="InterBold">
        Não existem dados recentes para esse gráfico
      </Text>
    </View>
  );

  return (
    <View style={style}>
      <Text size="regular" family="InterBold" style={styles.title}>
        {title}
      </Text>
      <View style={styles.container}>
        {data.length > 0 ? renderChart() : renderNoData()}
      </View>
    </View>
  );
};

const getEdgeValues = (data: DataType[]) => {
  let min = Infinity;
  let max = -Infinity;

  data.forEach((coords) => {
    if (coords.y >= max) max = coords.y;
    if (coords.y <= min) min = coords.y;
  });

  return { min, max };
};

const getXAxisMaxSize = (timeOfMeasures?: time) => {
  if (timeOfMeasures === "daily") {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);

    return lastDay.getDate();
  }
  return timeOfMeasures === "hourly" || !timeOfMeasures ? 23 : 52;
};

export default LineChart;
