import { Router } from 'express';
import { createOrder, listOrders } from '../services/orderService.js';

export const ordersRouter = Router();

ordersRouter.get('/', async (req, res) => {
  const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
  res.json(await listOrders(userId));
});

ordersRouter.post('/', async (req, res) => {
  const { userId, customerName, items, paymentMethod } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: 'items are required' });
    return;
  }

  const order = await createOrder({
    userId,
    customerName,
    items,
    paymentMethod: paymentMethod ?? 'fake',
  });

  res.status(201).json(order);
});
