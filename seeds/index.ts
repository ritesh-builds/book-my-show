// seeds/index.ts — Run all seeds in order (Non-destructive upsert)

import { mongoClient } from '../src/lib/mongodb.client.ts';
import { env } from '../src/config/env.ts';
import { citiesSeed } from './cities.seed.ts';
import { cinemasSeed } from './cinemas.seed.ts';
import { showsSeed } from './shows.seed.ts';
import { bookedSeatsSeed, bookingsSeed } from './bookings.seed.ts';
import { showsSearch } from '../src/modules/shows/shows.search.ts';

export async function runSeeds(): Promise<void> {
  console.log('🚀 Starting BookMyShow database seed process...');

  try {
    // 1. Connect to MongoDB
    console.log(`Connecting to MongoDB at ${env.MONGODB_URI}...`);
    await mongoClient.connect(env.MONGODB_URI);
    const db = mongoClient.connection.db;

    if (db) {
      console.log('Connected to MongoDB. Performing safe, non-destructive upserts...');

      // Upsert Cities
      const citiesCol = db.collection('cities');
      for (const city of citiesSeed) {
        await citiesCol.updateOne(
          { id: city.id },
          { $set: { ...city, createdAt: new Date() } },
          { upsert: true },
        );
      }
      console.log(`✓ Seeded ${citiesSeed.length} cities`);

      // Upsert Cinemas
      const cinemasCol = db.collection('cinemas');
      for (const cinema of cinemasSeed) {
        await cinemasCol.updateOne(
          { id: cinema.id },
          { $set: { ...cinema, createdAt: new Date() } },
          { upsert: true },
        );
      }
      console.log(`✓ Seeded ${cinemasSeed.length} cinemas`);

      // Upsert Shows
      const showsCol = db.collection('shows');
      for (const show of showsSeed) {
        await showsCol.updateOne(
          { id: show.id },
          { $set: { ...show, createdAt: new Date() } },
          { upsert: true },
        );
      }
      console.log(`✓ Seeded ${showsSeed.length} shows`);

      // Upsert Bookings
      const bookingsCol = db.collection('bookings');
      for (const booking of bookingsSeed) {
        await bookingsCol.updateOne(
          { id: booking.id },
          { $set: booking },
          { upsert: true },
        );
      }
      console.log(`✓ Seeded ${bookingsSeed.length} initial confirmed bookings`);
    } else {
      console.log('MongoDB connection established but database instance unavailable.');
    }

    // 2. Index shows into Elasticsearch for search discovery
    console.log('Indexing shows into Elasticsearch...');
    for (const show of showsSeed) {
      await showsSearch.indexShow({ ...show, createdAt: new Date() });
    }
    console.log(`✓ Indexed ${showsSeed.length} shows in Elasticsearch`);

    await mongoClient.disconnect();
    console.log('MongoDB disconnected cleanly.');
  } catch (error: any) {
    console.warn(`MongoDB or Elasticsearch offline/degraded (${error.message}). In-memory repositories remain active.`);
  }

  console.log('🎉 Seed execution finished successfully.');
}
