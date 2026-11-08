// modules/bookings/bookings.schema.ts — Zod validation schemas for bookings & seat lock

import { z } from 'zod';

export const SeatParamsSchema = z.object({
  showId: z.string({ required_error: 'showId is required' }).min(1, 'showId cannot be empty'),
});

export const LockSeatsBodySchema = z.object({
  seatNumbers: z
    .array(z.string().min(1, 'seatNumber cannot be empty'))
    .min(1, 'At least one seat must be selected')
    .max(10, 'Cannot lock more than 10 seats in a single request'),
  userId: z.string({ required_error: 'userId is required' }).min(1, 'userId cannot be empty'),
});

export const ConfirmBookingBodySchema = z.object({
  showId: z.string().min(1, 'showId is required'),
  seatNumbers: z.array(z.string().min(1)).min(1, 'seatNumbers are required'),
  userId: z.string().min(1, 'userId is required'),
  paymentId: z.string().min(1, 'paymentId is required'),
  orderId: z.string().min(1, 'orderId is required'),
  signature: z.string().min(1, 'signature is required'),
  customerEmail: z.string().email('Invalid email address').optional(),
  customerPhone: z.string().optional(),
});

