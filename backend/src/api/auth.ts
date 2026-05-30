import { Router } from 'express';
import { loginUser, registerUser } from '../services/authService.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};

    if (!name || !email || !password) {
      res.status(400).json({ message: 'name, email and password are required' });
      return;
    }

    res.status(201).json(await registerUser({ name, email, password }));
  } catch (error) {
    res.status(409).json({ message: error instanceof Error ? error.message : 'Register failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ message: 'email and password are required' });
      return;
    }

    res.json(await loginUser({ email, password }));
  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' });
  }
});
