import mongoose, { Schema } from 'mongoose';

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  totalAmount: number;
  subtotal: number;
  deliveryFee: number;
  status: OrderStatus;
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  odooId?: string; // Référence vers la commande dans Odoo
  createdAt: Date;
}

const orderSchema = new Schema<Order>({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  subtotal: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  status: { type: String, default: 'pending' },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, default: 'cash' },
  paymentStatus: { type: String, default: 'pending' },
  odooId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', orderSchema);