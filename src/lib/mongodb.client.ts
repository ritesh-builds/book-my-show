// lib/mongodb.client.ts — Mongoose connection singleton

import mongoose from 'mongoose';

export const mongoClient = {
  async connect(uri: string): Promise<void> {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  },

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  },

  get connection() {
    return mongoose.connection;
  },
};
