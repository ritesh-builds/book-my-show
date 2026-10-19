// seeds/index.ts — Run all seeds in order

import { citiesSeed } from './cities.seed.ts';
import { cinemasSeed } from './cinemas.seed.ts';
import { showsSeed } from './shows.seed.ts';

export async function runSeeds(): Promise<void> {
  console.log('Running seeds...');

  // TODO: Connect to MongoDB and insert documents
  // const { mongoClient } = await import('../src/lib/mongodb.client.ts');
  // await mongoClient.connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/book-my-show');
  //
  // await City.insertMany(citiesSeed);
  // await Cinema.insertMany(cinemasSeed);
  // await Show.insertMany(showsSeed);
  //
  // await mongoClient.disconnect();

  console.log(`Cities to seed: ${citiesSeed.length}`);
  console.log(`Cinemas to seed: ${cinemasSeed.length}`);
  console.log(`Shows to seed: ${showsSeed.length}`);
  console.log('Seed data ready. Connect MongoDB and uncomment insertion logic.');
}

await runSeeds();
