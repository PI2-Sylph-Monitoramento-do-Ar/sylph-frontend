import { TotemCardProps } from "_/components/TotemCard";

export interface TotemFromApiType
  extends Pick<TotemCardProps, "title" | "totemProps"> {
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
            humidity: Math.floor(Math.random() * 90),
            temperature: Math.floor(Math.random() * 35),
            score: Math.floor(Math.random() * 10),
            locationName: "Gama",
          },
          coords: {
            latitude: position.latitude + Math.random(),
            longitude: position.longitude + Math.random(),
          },
          onPressMoreInfo: () => alert(title),
        };
      }
    );
    return Promise.resolve(values);
  }
}
