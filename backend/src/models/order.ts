import { Schema, model } from 'mongoose';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId?: string | number;
};

export type Order = {
  id: string;
  userId?: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

const orderItemSchema = new Schema<OrderItem>(
  {
    id: String,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    restaurantId: Schema.Types.Mixed,
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: String,
    customerName: String,
    items: { type: [orderItemSchema], default: [] },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'confirmed' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        ret.createdAt = ret.createdAt?.toISOString?.() ?? ret.createdAt;
        delete ret._id;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);

export const OrderModel = model('Order', orderSchema);
