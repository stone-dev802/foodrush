import { Schema, model } from 'mongoose';

export type MenuItem = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji?: string;
  imageUrl?: string;
  popular?: boolean;
};

export type Restaurant = {
  id?: string;
  name: string;
  category: string;
  emoji?: string;
  imageUrl?: string;
  city?: string;
  address?: string;
  badge?: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  tags?: string[];
  deliveryFee?: number;
  minOrder?: number;
  isOpen?: boolean;
  menu: MenuItem[];
};

const menuItemSchema = new Schema<MenuItem>(
  {
    id: String,
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    emoji: String,
    imageUrl: String,
    popular: { type: Boolean, default: false },
  },
  {
    _id: true,
    id: true,
  },
);

const restaurantSchema = new Schema<Restaurant>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    emoji: String,
    imageUrl: String,
    city: String,
    address: String,
    badge: String,
    rating: { type: Number, default: 0 },
    distance: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    tags: { type: [String], default: [] },
    deliveryFee: { type: Number, default: 0 },
    minOrder: { type: Number, default: 0 },
    isOpen: { type: Boolean, default: true },
    menu: { type: [menuItemSchema], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;

        if (Array.isArray(ret.menu)) {
          ret.menu = ret.menu.map((item: any, index: number) => ({
            ...item,
            id: item.id ?? item._id?.toString?.() ?? `${ret.id}-${index}`,
            _id: undefined,
          }));
        }

        return ret;
      },
    },
  },
);

export const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);
