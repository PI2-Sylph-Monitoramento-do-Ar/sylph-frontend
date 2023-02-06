import { GraphValues } from "_/screens/ChartsScreen";
import { Measurement, MeasurementKeys } from "_/types/dto/measurement";

export const mapMeasuresToGraph = (
  measures: Measurement[],
  key: MeasurementKeys
): GraphValues[] => {
  const _measures = measures.map((measure) => {
    return { x: measure.date_time, y: measure[key] };
  });

  return _measures as GraphValues[];
};
