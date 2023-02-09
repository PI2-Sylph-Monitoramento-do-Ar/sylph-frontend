export type MeasurementDto = {
  id?: string;
  totem_id: string;
  date_time: string;
  temperature?: number;
  pressure?: number;
  carbon_monoxide_level?: number;
  ozone_level?: number;
  nitrogen_dioxide_level?: number;
  particulate_matter_level?: number;
  altitude?: number;
  ammonia?: number;
};

export type MeasurementDtoKeys = keyof MeasurementDto;
