import { GraphValues } from "_/screens/ChartsScreen";
import { MeasurementDto, MeasurementDtoKeys } from "_/types/dto/measurement";

export const mapMeasuresToGraph = (
  measures: MeasurementDto[],
  key: MeasurementDtoKeys
): GraphValues[] => {
  const _measures = measures.map((measure) => {
    return { x: measure.date_time, y: measure[key] };
  });

  return _measures as GraphValues[];
};
