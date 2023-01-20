import { TotemCardProps } from "_/components/TotemCard";
import { TotemType } from "_/types/Totem";

export interface TotemFromApiType extends Pick<TotemCardProps, "title"> {
  totemProps: TotemType;
  coords: {
    longitude: number;
    latitude: number;
  };
}

export interface ITotemService {
  getTotem(position: any): Promise<TotemFromApiType[]>;
}

export class TotemService implements ITotemService {
  getTotem(position: any) {
    const quantity = [...new Array(10).keys()];

    const values: TotemFromApiType[] = quantity.map<TotemFromApiType>(
      (_, i) => {
        const title = `Totem ${i}`;
        return {
          title,
          totemProps: {
            humidity: {
              current: Math.floor(Math.random() * 90),
              max: Math.floor(Math.random() * 90),
              min: Math.floor(Math.random() * 90),
            },
            temperature: {
              current: Math.floor(Math.random() * 35),
              max: Math.floor(Math.random() * 35),
              min: Math.floor(Math.random() * 35),
            },
            airQuality: Math.floor(Math.random() * 100),
            score: Math.floor(Math.random() * 10),
            locationName: "Gama",
          },
          coords: {
            latitude: position.latitude + Math.random(),
            longitude: position.longitude + Math.random(),
          },
          onPressBottomButton: () => alert(title),
        };
      }
    );
    return Promise.resolve(values);
  }
}
