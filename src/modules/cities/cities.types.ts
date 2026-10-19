// modules/cities/cities.types.ts — TypeScript interfaces for Cities module

export interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  isActive: boolean;
  createdAt: Date;
}

export type CityId = string;

export interface GetCityParams {
  id: CityId;
}
