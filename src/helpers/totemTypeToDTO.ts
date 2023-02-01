import { TotemType } from "_/services/TotemService";
import { TotemDTO } from "_/types/dto/totem";

export const mapTotemTypeToDTO = (totem: TotemType): TotemDTO => {
        return {
            id: totem.id,
            name: totem.name,
            mac_address: totem.macAddress,
            is_active: true,
            location: totem.coords,
          }
}