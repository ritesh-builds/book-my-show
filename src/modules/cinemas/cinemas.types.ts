// modules/cinemas/cinemas.types.ts — TypeScript interfaces for Cinemas module

export interface Cinema {
  id: string;
  name: string;
  cityId: string;
  address: string;
  screens: number;
  isActive: boolean;
  createdAt: Date;
}

export type CinemaId = string;

export interface GetCinemaParams {
  id: CinemaId;
}

export interface GetCinemasByCityParams {
  cityId: string;
}
