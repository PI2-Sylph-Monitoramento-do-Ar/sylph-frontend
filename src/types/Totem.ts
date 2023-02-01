export interface IEdgeValues {
  current: number;
  min: number;
  max: number;
}

export interface TotemType {
  locationName: string;
  airQuality: number;
  temperature: IEdgeValues;
  humidity: IEdgeValues;
  dateTime: Date;
}
