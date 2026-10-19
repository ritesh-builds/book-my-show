// modules/cities/cities.repository.ts — In-memory data store (replace with MongoDB later)

import type { City } from './cities.types.ts';

const cities: City[] = [
  { id: 'c1', name: 'Mumbai',    state: 'Maharashtra', country: 'India', isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'c2', name: 'Delhi',     state: 'Delhi',       country: 'India', isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'c3', name: 'Bangalore', state: 'Karnataka',   country: 'India', isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'c4', name: 'Pune',      state: 'Maharashtra', country: 'India', isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'c5', name: 'Chennai',   state: 'Tamil Nadu',  country: 'India', isActive: true, createdAt: new Date('2024-01-01') },
];

export const citiesRepository = {
  findAll(): City[] {
    return cities.filter(c => c.isActive);
  },

  findById(id: string): City | undefined {
    return cities.find(c => c.id === id && c.isActive);
  },
};
