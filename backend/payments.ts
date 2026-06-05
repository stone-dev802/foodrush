import { Router } from 'express';
import { paymentService } from '../services/paymentService.js';
import { protect } from '../models/authMiddleware.js';

const router = Router();

router.post('/process', protect, async (req, res) => {
  try {
    const { amount, method, details } = req.body;
    const result = await paymentService.processPayment(amount, method, details);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;