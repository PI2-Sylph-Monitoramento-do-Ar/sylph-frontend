import { HttpsAdapterType } from "_/adapters/https/HttpsAdapter";
import { PrevisionDto } from "_/types/dto/prevision";

export interface IPrevisionService {
  listPrevision(totemId?: string): Promise<PrevisionDto | undefined>;
}

export class PrevisionService implements IPrevisionService {
  api: HttpsAdapterType;

  constructor(api: HttpsAdapterType) {
    this.api = api;
  }

  async listPrevision(totemId?: string) {
    const _totemId = totemId ? `?totem_id=${totemId}` : "";

    const measures = await this.api.get<PrevisionDto>(
      `/previsions${_totemId}`
    );

    return measures;
  }

}
