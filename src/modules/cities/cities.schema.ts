// modules/cities/cities.schema.ts — Zod schemas for request/response validation

import { z } from 'zod';

export const CityParamsSchema = z.object({
  id: z.string().min(1, 'City ID is required'),
});

export const CityResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  state: z.string(),
  country: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
});

export const CitiesListResponseSchema = z.array(CityResponseSchema);

export type CityParamsInput = z.infer<typeof CityParamsSchema>;
export type CityResponseOutput = z.infer<typeof CityResponseSchema>;
