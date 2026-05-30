import 'dotenv/config';
import mongoose from 'mongoose';
import { restaurants } from '../data/restaurants.js';
import { RestaurantModel } from '../models/restaurant.js';

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to seed MongoDB');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  await RestaurantModel.deleteMany({});
  await RestaurantModel.insertMany(restaurants);
  await mongoose.disconnect();

  console.log(`Seeded ${restaurants.length} restaurants into MongoDB`);
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
