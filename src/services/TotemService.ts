import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { TotemCardProps } from "_/components/TotemCard";
import {
  airQualityCalculator,
  PolluterType,
} from "_/helpers/airQualityCalculator";
import { getEdgeValues } from "_/helpers/getEdgeValues";
import { MeasurementDto } from "_/types/dto/measurement";
import { Location, TotemDTO } from "_/types/dto/totem";
import { EdgeValuesNamesArray, TotemInfo } from "_/types/Totem";

const TOTAL_OF_MEASURES_IN_24H = (60 / 15) * 24;

export interface TotemType extends Pick<TotemCardProps, "title"> {
  email: string;
  totemProps: TotemInfo;
  coords: Location;
  id: string;
  name: string;
  macAddress: string;
}

export interface ITotemService {
  listTotem(totemId?: string): Promise<TotemType[]>;
  createTotem(totem: TotemDTO, token: string): Promise<void>;
  editTotem(totem: TotemDTO, token: string): Promise<void>;
  deleteTotem(id: string, token: string): Promise<void>;
}

export class TotemService implements ITotemService {
  api: HttpsAdapterType;

  constructor(api: HttpsAdapterType) {
    this.api = api;
  }

  async listTotem(totemId?: string) {
    const _totemId = totemId || "";
    const totems = await this.api.get<Array<TotemDTO>>(`/totems/${_totemId}`);
    let mostRecentValues: Array<TotemType> = [];
    const _totems = Array.isArray(totems) ? totems : [totems];
    if (totems) {
      for (const totem of _totems) {
        const totemProps = await this.getTotemProps(totem!);
        if (totemProps) {
          mostRecentValues.push({
            email: totem!.email,
            totemProps,
            coords: {
              longitude: totem!.location.longitude,
              latitude: totem!.location.latitude,
            },
            title: totem!.name ?? "",
            name: totem!.name ?? "",
            id: totem!.id,
            macAddress: totem!.mac_address,
          });
        }
      }
    }

    return mostRecentValues;
  }

  async createTotem(totem: TotemDTO, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await this.api.post("/totems", totem, config);
  }

  async editTotem(totem: TotemDTO, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await this.api.patch(`/totems/${totem.id}`, totem, config);
  }

  async deleteTotem(id: string, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await this.api.delete(`/totems/${id}`, config);
  }

  private getTotemProps = async (
    totem: TotemDTO
  ): Promise<TotemInfo | undefined> => {
    const measures = await this.api.get<Array<MeasurementDto>>(
      `/measurements?totem_id=${totem.id}`
    );

    if (measures) {
      let totemProps = {
        locationName: "Gama",
        temperature: { min: Infinity, max: -Infinity, current: 0 },
        pressure: { min: Infinity, max: -Infinity, current: 0 },
        particulate_matter_level: { min: Infinity, max: -Infinity, current: 0 },
        ozone_level: { min: Infinity, max: -Infinity, current: 0 },
        carbon_monoxide_level: { min: Infinity, max: -Infinity, current: 0 },
        ammonia: { min: Infinity, max: -Infinity, current: 0 },
        nitrogen_dioxide_level: { min: Infinity, max: -Infinity, current: 0 },
        dateTime: new Date("01/01/1900"),
      } as TotemInfo;

      const carbonMonoxideValues: number[] = [];
      const nitrogenDioxideValues: number[] = [];
      const particlesOnAirValues: number[] = [];
      const ozoneValues: number[] = [];

      const _measures = measures.slice(-TOTAL_OF_MEASURES_IN_24H);

      _measures?.forEach((measure) => {
        totemProps = {
          ...totemProps,
          ...this.mapEdgeValues(totemProps, measure),
        };

        if (measure.ozone_level) ozoneValues.push(measure?.ozone_level);

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

      const ozoneFinal = this.getAirQuality(ozoneValues, "ozone");

      totemProps.airQuality = Math.min(
        nitrogenFinal.qualityLevel,
        particlesFinal.qualityLevel,
        carbonFinal.qualityLevel,
        ozoneFinal.qualityLevel
      );
      return totemProps;
    }
  };

  private mapEdgeValues = (totemProps: TotemInfo, measure: MeasurementDto) => {
    EdgeValuesNamesArray.forEach((value) => {
      totemProps[value] = getEdgeValues(totemProps[value], measure[value]);
    });

    return totemProps;
  };

  private mapCurrentValues = (
    totemProps: TotemInfo,
    measure: MeasurementDto
  ) => {
    EdgeValuesNamesArray.forEach((value) => {
      if (measure[value])
        totemProps[value].current = Math.round(measure[value] as number);
    });

    return totemProps;
  };

  private getAirQuality = (values: number[], polluterType: PolluterType) => {
    if (values.length > 0) {
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      return airQualityCalculator(average, polluterType);
    }
    return {
      qualityLevel: 6,
    };
  };
}
