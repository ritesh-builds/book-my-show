// modules/shows/shows.schema.ts — Zod schemas for Shows

import { z } from 'zod';

export const ShowParamsSchema = z.object({
  id: z.string().min(1, 'Show ID is required'),
});

export const ShowsByCinemaParamsSchema = z.object({
  cinemaId: z.string().min(1, 'Cinema ID is required'),
});

export const ShowQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional(),
  language: z.string().optional(),
  format: z.string().optional(),
});

export const ShowResponseSchema = z.object({
  id: z.string(),
  movie: z.string(),
  cinemaId: z.string(),
  screenNo: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  date: z.string(),
  language: z.string(),
  format: z.string(),
  price: z.number(),
  availableSeats: z.number(),
  totalSeats: z.number(),
  isActive: z.boolean(),
});

export type ShowParamsInput = z.infer<typeof ShowParamsSchema>;
export type ShowsByCinemaParamsInput = z.infer<typeof ShowsByCinemaParamsSchema>;
export type ShowQueryInput = z.infer<typeof ShowQuerySchema>;
