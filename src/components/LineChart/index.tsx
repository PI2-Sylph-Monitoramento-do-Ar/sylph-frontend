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

const CHART_SIZE = 300;

interface LineChartData {
  data: DataType[];
  timeOfMeasures?: time;
}

type time = "hourly" | "daily" | "monthly";

interface DataType {
  x: number | string;
  y: number;
}

const LineChart = ({ timeOfMeasures, data }: LineChartData) => {
  const interpolation =
    timeOfMeasures === "hourly" || !timeOfMeasures ? undefined : "natural";

  const edgeValues = getEdgeValues(data);

  return (
    <VictoryChart
      domain={{
        x: [1, getXAxisMaxSize(timeOfMeasures)],
        y: [edgeValues.min - 0.5, edgeValues.max + 0.5],
      }}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryZoomContainer
          allowZoom={false}
          zoomDimension="x"
          zoomDomain={{
            x: [1, 6],
          }}
        />
      }
      width={SIZES.SCREEN_WIDTH * 0.9}
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
  return timeOfMeasures === "hourly" || !timeOfMeasures ? 23 : 12;
};

export default LineChart;
