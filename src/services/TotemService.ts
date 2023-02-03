import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { TotemCardProps } from "_/components/TotemCard";
import {
  airQualityCalculator,
  PolluterType,
} from "_/helpers/airQualityCalculator";
import { getEdgeValues } from "_/helpers/getEdgeValues";

import { Measurement } from "_/types/dto/measurement";
import { Location, Totem } from "_/types/dto/totem";
import { TotemType, EdgeValuesNamesArray } from "_/types/Totem";

const TOTAL_OF_MEASURES_IN_24H = (60 / 15) * 24;

const TOTAL_OF_MEASURES_IN_24H = (60 / 15) * 24;

export interface TotemFromApiType extends Pick<TotemCardProps, "title"> {
  totemProps: TotemType;
  totemId: string;
  coords: Omit<Location, "longitute"> & { longitude: number };
}

export interface ITotemService {
  listTotem(): Promise<TotemFromApiType[]>;
}

export class TotemService implements ITotemService {
  api: HttpsAdapterType;

  constructor(api: HttpsAdapterType) {
    this.api = api;
  }

  async listTotem() {
    const totems = await this.api.get<Array<Totem>>("/totems");

    let mostRecentValues: Array<TotemFromApiType> = [];

    if (totems) {
      for (const totem of totems) {
        const totemProps = await this.getTotemProps(totem);
        mostRecentValues.push({
          totemProps,
          coords: {
            longitude: totem.location.longitude,
            latitude: totem.location.latitude,
          },
          totemId: totem.id,
          title: totem.name,
        });
      }
    }
    return mostRecentValues;
  }

  private getTotemProps = async (totem: Totem): Promise<TotemType> => {
    const measures = await this.api.get<Array<Measurement>>(
      `/measurements?totem_id=${totem.id}`
    );

    let totemProps = {
      locationName: "Gama",
      temperature: { min: Infinity, max: -Infinity },
      humidity: { min: Infinity, max: -Infinity },
      particulate_matter_level: { min: Infinity, max: -Infinity },
      carbon_dioxide_level: { min: Infinity, max: -Infinity },
      carbon_monoxide_level: { min: Infinity, max: -Infinity },
      ammonia: { min: Infinity, max: -Infinity },
      nitrogen_dioxide_level: { min: Infinity, max: -Infinity },
      dateTime: new Date("01/01/1900"),
    } as TotemType;

    const carbonMonoxideValues: number[] = [];
    const nitrogenDioxideValues: number[] = [];
    const particlesOnAirValues: number[] = [];


    const _measures = measures?.slice(-TOTAL_OF_MEASURES_IN_24H);

    _measures?.forEach((measure) => {
      totemProps = {
        ...totemProps,
        ...this.mapEdgeValues(totemProps, measure),
      };

      if (measure.carbon_monoxide_level)
        carbonMonoxideValues.push(measure?.carbon_monoxide_level);

      if (measure.nitrogen_dioxide_level)
        nitrogenDioxideValues.push(measure.nitrogen_dioxide_level);

      if (measure.particulate_matter_level)
        particlesOnAirValues.push(measure.particulate_matter_level);


      const dateMeasured = new Date(measure.date_time);

      if (dateMeasured.getTime() > totemProps.dateTime.getTime()) {
        totemProps.dateTime = new Date(measure.date_time);

        totemProps = {
          ...totemProps,
          ...this.mapCurrentValues(totemProps, measure),
        };
      }
    });

    const nitrogenFinal = this.getAirQuality(
      nitrogenDioxideValues,
      "nitrogeDioxide"
    );

    const carbonFinal = this.getAirQuality(
      carbonMonoxideValues,
      "carbonMonoxide"
    );

    const particlesFinal = this.getAirQuality(
      particlesOnAirValues,
      "particles"
    );

    totemProps.airQuality = Math.min(
      nitrogenFinal.qualityLevel,
      particlesFinal.qualityLevel,
      carbonFinal.qualityLevel
    );

    totemProps.airQualityScore = Math.round(
      Math.max(nitrogenFinal.score, particlesFinal.score, carbonFinal.score)
    );

    return totemProps;
  };

  private mapEdgeValues = (totemProps: TotemType, measure: Measurement) => {
    EdgeValuesNamesArray.forEach((value) => {
      totemProps[value] = getEdgeValues(totemProps[value], measure[value]);
    });

    return totemProps;
  };

  private mapCurrentValues = (totemProps: TotemType, measure: Measurement) => {
    EdgeValuesNamesArray.forEach((value) => {
      if (measure[value])
        totemProps[value].current = Math.round(measure[value]);
    });

    return totemProps;
  };

  private getAirQuality = (values: number[], polluterType: PolluterType) => {
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    return airQualityCalculator(average, polluterType);
  };
}
