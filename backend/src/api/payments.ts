import { Router } from 'express';

export const paymentsRouter = Router();

paymentsRouter.post('/fake', (req, res) => {
  const { amount, method } = req.body ?? {};

  if (!amount || !method) {
    res.status(400).json({ message: 'amount and method are required' });
    return;
  }

  res.json({
    id: `pay_${Date.now()}`,
    status: 'success',
    method,
    amount,
    createdAt: new Date().toISOString(),
  });
});
