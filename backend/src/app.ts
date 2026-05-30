import cors from 'cors';
import express from 'express';
import { authRouter } from './api/auth.js';
import { ordersRouter } from './api/orders.js';
import { paymentsRouter } from './api/payments.js';
import { restaurantsRouter } from './api/restaurants.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({
      service: 'foodrush-api',
      status: 'ok',
      routes: ['/health', '/api/restaurants', '/api/auth/register', '/api/auth/login'],
    });
  });

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'foodrush-api' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/restaurants', restaurantsRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/payments', paymentsRouter);

  return app;
}
