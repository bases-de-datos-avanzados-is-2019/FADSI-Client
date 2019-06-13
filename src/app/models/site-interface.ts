export interface SiteInterface {
  latitude: number;
  longitude: number;
  location?: object;
  address: string;
  name: string;
  description: string;
  deliveryPersonnelQuantity: number;
  type?: [string];
  rating?: number;
  image?: string;
  telephoneNumber?: string;
  openingHours?: [string];
  website?: string;
  products?: [object];
  id?: string;
}
