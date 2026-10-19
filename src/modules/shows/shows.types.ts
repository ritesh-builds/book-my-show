// modules/shows/shows.types.ts — TypeScript interfaces for Shows module

export type ShowFormat = '2D' | '3D' | '4DX' | 'IMAX' | '3D IMAX';
export type ShowLanguage = 'Hindi' | 'English' | 'Telugu' | 'Tamil' | 'Kannada' | 'Malayalam';

export interface Show {
  id: string;
  movie: string;
  cinemaId: string;
  screenNo: number;
  startTime: string;  // HH:mm format
  endTime: string;
  date: string;       // YYYY-MM-DD format
  language: ShowLanguage;
  format: ShowFormat;
  price: number;      // in INR
  availableSeats: number;
  totalSeats: number;
  isActive: boolean;
  createdAt: Date;
}

export type ShowId = string;

export interface GetShowParams {
  id: ShowId;
}

export interface GetShowsByCinemaParams {
  cinemaId: string;
}
