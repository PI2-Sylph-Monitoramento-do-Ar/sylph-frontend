export interface IEdgeValues {
  current: number;
  min: number;
  max: number;
}

export type EdgeValuesTypes =
  | "temperature"
  | "humidity"
  | "carbon_dioxide_level"
  | "carbon_monoxide_level"
  | "nitrogen_dioxide_level"
  | "particulate_matter_level"
  | "ammonia";

export const EdgeValuesNamesArray = [
  "ammonia",
  "carbon_dioxide_level",
  "carbon_monoxide_level",
  "humidity",
  "nitrogen_dioxide_level",
  "particulate_matter_level",
  "temperature",
] as EdgeValuesTypes[];

export interface TotemType {
  locationName: string;
  airQuality: number;
  dateTime: Date;
  temperature: IEdgeValues;
  humidity: IEdgeValues;
  carbon_dioxide_level: IEdgeValues;
  carbon_monoxide_level: IEdgeValues;
  nitrogen_dioxide_level: IEdgeValues;
  particulate_matter_level: IEdgeValues;
  ammonia: IEdgeValues;
  pressure: number;
  altitude: number;

}
