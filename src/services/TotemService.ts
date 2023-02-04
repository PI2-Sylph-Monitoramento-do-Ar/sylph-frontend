import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { TotemCardProps } from "_/components/TotemCard";
import { Measurement } from "_/types/dto/measurement";
import { Location, TotemDTO } from "_/types/dto/totem";
import { TotemInfo } from "_/types/Totem";

export interface TotemType extends Pick<TotemCardProps, "title"> {
  totemProps: TotemInfo;
  coords: Location;
  id: string,
  name: string,
  macAddress: string,
}

export interface ITotemService {
  listTotem(): Promise<TotemType[]>;
  createTotem(totem: TotemDTO): Promise<void>;
}

export class TotemService implements ITotemService {
  api: HttpsAdapterType;

  constructor(api: HttpsAdapterType) {
    this.api = api;
  }

  async listTotem() {
    const totems = await this.api.get<Array<TotemDTO>>("/totems");

    let mostRecentValues: Array<TotemType> = [];

    if (totems) {
      for (const totem of totems) {
        const totemProps = await this.getTotemProps(totem);
        mostRecentValues.push({
          totemProps,
          coords: {
            longitude: totem.location.longitude,
            latitude: totem.location.latitude,
          },
          title: totem.mac_address,
          name: totem.name ?? '',
          id: totem.id,
          macAddress: totem.mac_address,
        });
      }
    }
    return mostRecentValues;
  }

  async createTotem (totem: TotemDTO) {
    await this.api.post('/totems', totem);
  }

  private getTotemProps = async (totem: TotemDTO): Promise<TotemInfo> => {
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
    } as TotemInfo;

    if (!measures?.length) {
      totemProps = {
        locationName: "Gama",
        temperature: {
          current: 0,
          min: 0,
          max:  0,
        },
        humidity: {
          current: 0,
          min: 0,
          max:  0,
        },
        dateTime: new Date("01/01/1900"),
      } as TotemInfo;
  
    }

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
        totemProps.humidity.current = measure.humidity ?? 0;
        totemProps.temperature.current = measure.temperature ?? 0;
      }
    });

    return totemProps;
  };
}
