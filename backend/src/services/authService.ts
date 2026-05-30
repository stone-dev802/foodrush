import { hasMongoConfig } from '../config/database.js';
import { UserModel } from '../models/user.js';

type MemoryUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: MemoryUser[] = [];

export async function registerUser(input: { name: string; email: string; password: string }) {
  const email = input.email.trim().toLowerCase();

  if (hasMongoConfig()) {
    const existing = await UserModel.findOne({ email });

    if (existing) {
      throw new Error('Email already registered');
    }

    const user = await UserModel.create({
      name: input.name.trim(),
      email,
      password: input.password,
    });

    return {
      token: `fake_token_${user.id}`,
      user: user.toJSON(),
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
    token: `fake_token_${user.id}`,
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
    const user = await UserModel.findOne({ email, password: input.password });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      token: `fake_token_${user.id}`,
      user: user.toJSON(),
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
