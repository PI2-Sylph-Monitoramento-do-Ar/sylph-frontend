export interface Location {
  latitude: number;
  longitude: number;
}

export type Totem = {
  mac_address: string;
  is_active: boolean;
  location: Location;
  email: string;
  name: string;
  id: string;
};
