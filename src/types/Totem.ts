interface IntervalValues {
  current: number;
  min: number;
  max: number;
}

export interface TotemType {
  score: string | number;
  locationName: string;
  airQuality: number;
  temperature: IntervalValues;
  humidity: IntervalValues;
}
