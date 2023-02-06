export interface Location {
  latitude: number;
  longitude: number;
}
export interface TotemDTO {
  id: string;
  name?: string;
  mac_address: string;
  is_active: boolean;
  location: Location;
  email: string;
}
