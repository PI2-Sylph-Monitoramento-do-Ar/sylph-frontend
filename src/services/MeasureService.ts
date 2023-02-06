import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { MeasurementDto } from "_/types/dto/measurement";

export interface IMeasureService {
  listMeasures(totemId?: string): Promise<MeasurementDto[] | undefined>;
  downloadCsv(totemId: string): Promise<string | undefined>;
}

export class MeasureService implements IMeasureService {
  api: HttpsAdapterType;

  constructor(api: HttpsAdapterType) {
    this.api = api;
  }

  async listMeasures(totemId?: string) {
    const _totemId = totemId ? `?totem_id=${totemId}` : "";

    const measures = await this.api.get<Array<MeasurementDto>>(
      `/measurements${_totemId}`
    );

    return measures;
  }

  async downloadCsv(totemId: string) {
    const csvData = await this.api.get<string>(`/measurements/csv/${totemId}`);

    return csvData;
  }
}
