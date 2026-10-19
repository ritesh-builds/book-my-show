// modules/cinemas/cinemas.schema.ts — Zod schemas for Cinemas

import { z } from 'zod';

export const CinemaParamsSchema = z.object({
  id: z.string().min(1, 'Cinema ID is required'),
});

export const CinemasByCityParamsSchema = z.object({
  cityId: z.string().min(1, 'City ID is required'),
});

export const CinemaResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  cityId: z.string(),
  address: z.string(),
  screens: z.number(),
  isActive: z.boolean(),
  createdAt: z.date(),
});

export type CinemaParamsInput = z.infer<typeof CinemaParamsSchema>;
export type CinemasByCityParamsInput = z.infer<typeof CinemasByCityParamsSchema>;
export type CinemaResponseOutput = z.infer<typeof CinemaResponseSchema>;
