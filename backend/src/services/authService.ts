import { hasMongoConfig } from '../config/database.js';
import { UserModel, UserRole } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type MemoryUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-foodrush-key'; // Utilise une clé forte en production

const users: MemoryUser[] = [];

export async function registerUser(input: { name: string; email: string; password: string }) {
  const email = input.email.trim().toLowerCase();

  if (hasMongoConfig()) {
    const existing = await UserModel.findOne({ email });

    if (existing) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await UserModel.create({
      name: input.name.trim(),
      email,
      password: hashedPassword,
      role: 'customer', // Rôle par défaut pour les nouvelles inscriptions
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return {
      token,
      user: {
        id: user._id.toString(), // Convertir ObjectId en string
        name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
    };
  }

  const existing = users.find((user) => user.email === email);

  if (existing) {
    throw new Error('Email already registered');
  }

  const user: MemoryUser = {
    id: `user_${Date.now()}`,
    name: input.name.trim(),
    email,
    password: input.password,
  };

  users.push(user);

  return {
    token: `fake_token_${user.id}`, // Garde le fake token pour le mode sans MongoDB
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function loginUser(input: { email: string; password: string }) {
  const email = input.email.trim().toLowerCase();

  if (hasMongoConfig()) {
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(input.password, user.password || ''))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return {
      token,
      user: {
        id: user._id.toString(), // Convertir ObjectId en string
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt },
    };
  }

  const user = users.find((item) => item.email === email && item.password === input.password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  return {
    token: `fake_token_${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
    },
  };
}
