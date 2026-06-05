import mongoose, { Schema } from 'mongoose';

export interface Product {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  restaurantId: string;
  isAvailable: boolean;
  odooProductId?: string; // ID pour la synchro Odoo
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  restaurantId: { type: String, required: true, index: true },
  isAvailable: { type: Boolean, default: true },
  odooProductId: { type: String }
}, { timestamps: true });

export const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);