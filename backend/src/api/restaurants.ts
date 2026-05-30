import { Router } from 'express';
import { getRestaurantById, listRestaurants } from '../services/restaurantService.js';

export const restaurantsRouter = Router();

restaurantsRouter.get('/', async (_req, res) => {
  res.json(await listRestaurants());
});

restaurantsRouter.get('/:id', async (req, res) => {
  const restaurant = await getRestaurantById(req.params.id);

  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
    return;
  }

  res.json(restaurant);
});
