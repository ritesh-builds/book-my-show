// modules/bookings/bookings.routes.ts — Fastify route handlers for Seat Locking & Bookings

import type { FastifyPluginAsync } from 'fastify';
import { bookingsService } from './bookings.service.ts';
import { SeatParamsSchema, LockSeatsBodySchema, ConfirmBookingBodySchema } from './bookings.schema.ts';
import type { ApiResponse } from '../../shared/types.ts';
import type { SeatMapResponse, LockSeatsResult, Booking } from './bookings.types.ts';

const bookingsRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/shows/:showId/seats — Live Seat Map (Available, Locked, Booked)
  fastify.get<{ Params: { showId: string } }>(
    '/shows/:showId/seats',
    async (request, reply): Promise<ApiResponse<SeatMapResponse>> => {
      const paramsResult = SeatParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          success: false,
          error: paramsResult.error.errors[0]?.message ?? 'Invalid showId parameter',
        });
      }

      const data = await bookingsService.getSeatMap(paramsResult.data.showId);
      return reply.send({ success: true, data });
    },
  );

  // POST /api/v1/shows/:showId/lock — Atomic Distributed Seat Lock
  fastify.post<{ Params: { showId: string }; Body: { seatNumbers: string[]; userId: string } }>(
    '/shows/:showId/lock',
    async (request, reply): Promise<ApiResponse<LockSeatsResult>> => {
      const paramsResult = SeatParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          success: false,
          error: paramsResult.error.errors[0]?.message ?? 'Invalid showId parameter',
        });
      }

      const bodyResult = LockSeatsBodySchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.status(400).send({
          success: false,
          error: bodyResult.error.errors[0]?.message ?? 'Invalid lock request body',
        });
      }

      const data = await bookingsService.lockSeats({
        showId: paramsResult.data.showId,
        seatNumbers: bodyResult.data.seatNumbers,
        userId: bodyResult.data.userId,
      });

      return reply.status(200).send({ success: true, data });
    },
  );

  // POST /api/v1/bookings/confirm — Verify Payment & Finalize Booking
  fastify.post<{
    Body: {
      showId: string;
      seatNumbers: string[];
      userId: string;
      paymentId: string;
      orderId: string;
      signature: string;
      customerEmail?: string;
      customerPhone?: string;
    };
  }>('/bookings/confirm', async (request, reply): Promise<ApiResponse<Booking>> => {
    const bodyResult = ConfirmBookingBodySchema.safeParse(request.body);
    if (!bodyResult.success) {
      return reply.status(400).send({
        success: false,
        error: bodyResult.error.errors[0]?.message ?? 'Invalid confirm booking body',
      });
    }

    const data = await bookingsService.confirmBooking(bodyResult.data);
    return reply.status(201).send({ success: true, data });
  });
};

export default bookingsRoutes;

