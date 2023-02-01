export interface IntervalValues {
  current: number;
  min: number;
  max: number;
}

export interface TotemInfo {
  locationName: string;
  airQuality: number;
  temperature: IntervalValues;
  humidity: IntervalValues;
  dateTime: Date;
}
