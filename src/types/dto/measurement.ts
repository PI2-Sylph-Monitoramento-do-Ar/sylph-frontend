import { Model } from "./model";

export interface Measurement extends Model {
  totem_id: string;
  temperature: number;
  humidity: number;
  date_time: Date;
  carbon_monoxide_level: number;
  nitrogen_dioxide_level: number;
  particulate_matter_level: boolean;
}

export type MeasurementDto = {
  totem_id: string;
  temperature: number;
  humidity: number;
  date_time: Date;
  carbon_monoxide_level: number;
  nitrogen_dioxide_level: number;
  particulate_matter_level: boolean;
};
