// seeds/cities.seed.ts — MongoDB seed data for cities

import type { City } from '../src/modules/cities/cities.types.ts';

export const citiesSeed: Omit<City, 'createdAt'>[] = [
  { id: 'c1', name: 'Mumbai',    state: 'Maharashtra', country: 'India', isActive: true },
  { id: 'c2', name: 'Delhi',     state: 'Delhi',       country: 'India', isActive: true },
  { id: 'c3', name: 'Bangalore', state: 'Karnataka',   country: 'India', isActive: true },
  { id: 'c4', name: 'Pune',      state: 'Maharashtra', country: 'India', isActive: true },
  { id: 'c5', name: 'Chennai',   state: 'Tamil Nadu',  country: 'India', isActive: true },
];
