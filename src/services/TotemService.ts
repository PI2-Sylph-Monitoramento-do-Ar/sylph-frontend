import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { TotemCardProps } from "_/components/TotemCard";
import { Measurement } from "_/types/dto/measurement";
import { Location, Totem } from "_/types/dto/totem";
import { TotemType } from "_/types/Totem";

export interface TotemFromApiType extends Pick<TotemCardProps, "title"> {
  totemProps: TotemType;
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
            longitude: totem.location.longitute,
            latitude: totem.location.latitude,
          },
          title: totem.mac_address,
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

    measures?.forEach((measure) => {
      if (measure.temperature >= totemProps.temperature.max) {
        totemProps.temperature.max = measure.temperature;
      }

      if (measure.temperature <= totemProps.temperature.min) {
        totemProps.temperature.min = measure.temperature;
      }

      if (measure.humidity >= totemProps.humidity.max) {
        totemProps.humidity.max = measure.humidity;
      }

      if (measure.humidity <= totemProps.humidity.min) {
        totemProps.humidity.min = measure.humidity;
      }

      const currentDate = new Date(measure.date_time);

      if (currentDate.getTime() > totemProps.dateTime.getTime()) {
        totemProps.dateTime = new Date(measure.date_time);
        totemProps.humidity.current = measure.humidity;
        totemProps.temperature.current = measure.temperature;
      }
    });

    return totemProps;
  };
}
