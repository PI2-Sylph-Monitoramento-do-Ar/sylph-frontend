import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { TotemCardProps } from "_/components/TotemCard";
import { airQualityCalculator } from "_/helpers/airQualityCalculator";
import { getCarbonMonoxideValues } from "_/helpers/getCarbonMonoxideValues";
import { getEdgeValues } from "_/helpers/getEdgeValues";
import { getParticlesValues } from "_/helpers/getParticlesValues";
import { Measurement } from "_/types/dto/measurement";
import { Location, Totem } from "_/types/dto/totem";
import { TotemType } from "_/types/Totem";

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
      temperature: {
        min: Infinity,
        max: -Infinity,
      },
      humidity: {
        min: Infinity,
        max: -Infinity,
      },
      dateTime: new Date("01/01/1900"),
    } as TotemType;

    const carbonMonoxideValues: number[] = [];
    const nitrogenDioxideValues: number[] = [];

    const _measures = measures?.slice(-TOTAL_OF_MEASURES_IN_24H);

    _measures?.forEach((measure) => {
      totemProps.temperature = getEdgeValues(
        totemProps.temperature,
        measure.temperature
      );

      totemProps.humidity = getEdgeValues(
        totemProps.humidity,
        measure.humidity
      );
      if (measure.carbon_monoxide_level)
        carbonMonoxideValues.push(measure?.carbon_monoxide_level);

      if (measure.nitrogen_dioxide_level)
        nitrogenDioxideValues.push(measure.nitrogen_dioxide_level);

      const dateMeasured = new Date(measure.date_time);

      if (dateMeasured.getTime() > totemProps.dateTime.getTime()) {
        totemProps.dateTime = new Date(measure.date_time);

        if (measure.humidity)
          totemProps.humidity.current = Math.round(measure.humidity);

        if (measure.temperature)
          totemProps.temperature.current = Math.round(measure.temperature);
      }
    });

    let qualityLevel = 0;

    const carbonAverage =
      carbonMonoxideValues.reduce((a, b) => a + b, 0) /
      carbonMonoxideValues.length;

    const nitrogenAverage =
      nitrogenDioxideValues.reduce((a, b) => a + b, 0) /
      nitrogenDioxideValues.length;

    const nitrogenDioxideFinal = airQualityCalculator(
      nitrogenAverage,
      "nitrogeDioxide"
    );

    const carbonMonoxideFinal = airQualityCalculator(
      carbonAverage,
      "carbonMonoxide"
    );

    qualityLevel =
      nitrogenDioxideFinal.qualityLevel < carbonMonoxideFinal.qualityLevel
        ? nitrogenDioxideFinal.qualityLevel
        : carbonMonoxideFinal.qualityLevel;

    totemProps.airQuality = qualityLevel;

    return totemProps;
  };
}
