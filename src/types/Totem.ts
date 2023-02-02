export interface IEdgeValues {
  current: number;
  min: number;
  max: number;
}

export interface TotemType {
  locationName: string;
  airQuality: number;
  dateTime: Date;
  temperature: IEdgeValues;
  humidity: IEdgeValues;
  carbon_monoxide_level?: IEdgeValues;
  carbon_dioxide_level?: IEdgeValues;
  nitrogen_dioxide_level?: IEdgeValues;
  particulate_matter_level?: IEdgeValues;
  pressure?: number;
  altitude?: number;
  ammonia?: number;
}
