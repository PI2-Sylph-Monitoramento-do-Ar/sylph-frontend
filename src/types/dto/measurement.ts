export type MeasurementDto = {
  id?: string;
  totem_id: string;
  date_time: string;
  temperature?: number;
  humidity?: number;
  carbon_monoxide_level?: number;
  ozone_level?: number;
  nitrogen_dioxide_level?: number;
  particulate_matter_level?: number;
  pressure?: number;
  altitude?: number;
  ammonia?: number;
};

export type MeasurementDtoKeys = keyof MeasurementDto;
