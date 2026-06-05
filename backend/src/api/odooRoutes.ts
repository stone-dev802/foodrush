import { Router } from 'express';
import odooService from '../services/odooService.js';
import { protect, authorize } from '../models/authMiddleware.js';

const router = Router();

router.get('/status', protect, authorize('admin'), async (req, res) => {
  const status = await odooService.checkStatus();
  res.json(status);
});

router.post('/sync/restaurants', protect, authorize('admin'), async (req, res) => {
  const result = await odooService.syncRestaurants();
  res.json(result);
});

router.post('/sync/products', protect, authorize('admin', 'restaurant_owner'), async (req, res) => {
  const { restaurantId } = req.body;
  const result = await odooService.syncProducts(restaurantId);
  res.json(result);
});

router.post('/sync/stocks', protect, authorize('admin'), async (req, res) => {
  const result = await odooService.syncProducts();
  res.json({ message: "Stocks synchronisés", details: result });
});

// TODO: Ajouter /sync/orders pour pousser les commandes manuellement si besoin

export default router;