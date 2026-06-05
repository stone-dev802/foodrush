import mongoose, { Schema } from 'mongoose';

export type UserRole = 'customer' | 'admin' | 'restaurant_owner' | 'staff' | 'delivery';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Haché en DB
  role: UserRole;
  restaurantId?: string; // Pour les rôles restaurant_owner et staff
  createdAt: Date;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'restaurant_owner', 'staff', 'delivery'], default: 'customer' },
  restaurantId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}