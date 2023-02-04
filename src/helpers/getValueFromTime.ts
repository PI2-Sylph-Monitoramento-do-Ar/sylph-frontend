import moment from "moment";
import { GraphValues } from "_/screens/ChartsScreen";

const getValuesFromToday = (graphValues: GraphValues[]) => {
  const DATE_FORMAT = "YYYY/MM/DD HH:mm:ss";

  const yesterday = moment.utc().subtract(1, "day").format(DATE_FORMAT);

  const measuresFromToday: GraphValues[] = [];

  graphValues.forEach((value) => {
    const measureDate = moment(value.x).utc().format(DATE_FORMAT);

    if (moment(measureDate).utc().isAfter(yesterday)) {
      measuresFromToday.push({
        x: moment(value.x).format("DD/MM - HH:mm"),
        y: value.y,
      });
    }
  });

  return measuresFromToday;
};

const getValuesFromWeeks = (graphValues: GraphValues[], month?: boolean) => {
  const DATE_FORMAT = "YYYY/MM/DD";
  const valuesFromWeek: GraphValues[] = [];

  for (let i = month ? 4 : 7; i > 0; i--) {
    const weekInitialDay = moment
      .utc()
      .subtract(i, month ? "week" : "day")
      .format(DATE_FORMAT);
    const weekFinalDay = moment
      .utc()
      .subtract(i - 1, month ? "week" : "day")
      .format(DATE_FORMAT);

    let totalValue = 0;
    let quantityOfMeasures = 0;
    let currentDay = "";

    graphValues.forEach((value) => {
      const measureDate = moment(new Date(value.x)).utc().format(DATE_FORMAT);

      if (
        moment(measureDate).isSameOrAfter(weekInitialDay) &&
        moment(measureDate).isSameOrBefore(weekFinalDay)
      ) {
        quantityOfMeasures++;
        totalValue += value.y;
        currentDay = moment(measureDate).format("DD/MM/YYYY");
      }
    });

    if (quantityOfMeasures > 0)
      valuesFromWeek.push({
        x: currentDay,
        y: totalValue / quantityOfMeasures,
      });
  }

  return valuesFromWeek;
};

export { getValuesFromToday, getValuesFromWeeks };
