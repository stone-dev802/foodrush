import { restaurants } from '../data/restaurants.js';
import { hasMongoConfig } from '../config/database.js';
import { RestaurantModel } from '../models/restaurant.js';

export async function listRestaurants() {
  if (!hasMongoConfig()) {
    return restaurants;
  }

  return RestaurantModel.find().sort({ createdAt: 1 });
}

export async function getRestaurantById(id: string) {
  if (!hasMongoConfig()) {
    return restaurants.find((restaurant) => restaurant.id === id) ?? null;
  }

  return RestaurantModel.findById(id);
}
