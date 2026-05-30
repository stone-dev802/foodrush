import mongoose from 'mongoose';

export function hasMongoConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB disabled: MONGODB_URI is not configured. Using memory fallback.');
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}
