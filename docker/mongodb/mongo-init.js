// docker/mongodb/mongo-init.js — MongoDB init script

db = db.getSiblingDB('book-my-show');

db.createCollection('cities');
db.createCollection('cinemas');
db.createCollection('shows');

// Indexes
db.cities.createIndex({ name: 1 }, { unique: true });
db.cinemas.createIndex({ cityId: 1 });
db.cinemas.createIndex({ name: 1 });
db.shows.createIndex({ cinemaId: 1 });
db.shows.createIndex({ date: 1 });
db.shows.createIndex({ cinemaId: 1, date: 1 });

print('MongoDB initialized: book-my-show database created with indexes.');
