export interface IEdgeValues {
  current: number;
  min: number;
  max: number;
}

export type EdgeValuesTypes =
  | "temperature"
  | "humidity"
  | "ozone_level"
  | "carbon_monoxide_level"
  | "nitrogen_dioxide_level"
  | "particulate_matter_level"
  | "ammonia";

export const EdgeValuesNamesArray = [
  "ammonia",
  "ozone_level",
  "carbon_monoxide_level",
  "humidity",
  "nitrogen_dioxide_level",
  "particulate_matter_level",
  "temperature",
] as EdgeValuesTypes[];

export interface TotemInfo {
  locationName: string;
  airQuality: number;
  dateTime: Date;
  temperature: IEdgeValues;
  humidity: IEdgeValues;
  ozone_level: IEdgeValues;
  carbon_monoxide_level: IEdgeValues;
  nitrogen_dioxide_level: IEdgeValues;
  particulate_matter_level: IEdgeValues;
  ammonia: IEdgeValues;
  pressure: number;
  altitude: number;
}
