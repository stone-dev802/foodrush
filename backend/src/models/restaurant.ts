import mongoose, { Schema } from 'mongoose';

export interface Restaurant {
  id: string;
  name: string;
  ownerId: string; // Lien avec l'utilisateur (UserRole: restaurant_owner)
  address: string;
  phone: string;
  isOpen: boolean;
  cuisineType: string[];
  rating: number;
  image?: string;
  odooPartnerId?: string; // ID correspondant dans Odoo (res.partner)
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<Restaurant>({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
  cuisineType: [{ type: String }],
  rating: { type: Number, default: 0 },
  image: { type: String },
  odooPartnerId: { type: String }
}, { timestamps: true });

export const RestaurantModel = mongoose.models.Restaurant || mongoose.model<Restaurant>('Restaurant', restaurantSchema);