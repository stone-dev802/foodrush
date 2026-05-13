// src/store/cartStore.ts

import { create } from 'zustand';
import { MenuItem } from '../data/mockData';

export interface CartItem extends MenuItem {
  qty: number;
  restoName: string;
  restoId: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: MenuItem, restoId: number, restoName: string) => void;
  removeFromCart: (itemId: number) => void;
  incrementQty: (itemId: number) => void;
  decrementQty: (itemId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
  getItemQty: (itemId: number) => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (item, restoId, restoName) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...item, qty: 1, restoId, restoName }],
      }));
    }
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }));
  },

  incrementQty: (itemId) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, qty: i.qty + 1 } : i
      ),
    }));
  },

  decrementQty: (itemId) => {
    const item = get().items.find((i) => i.id === itemId);
    if (!item) return;
    if (item.qty <= 1) {
      get().removeFromCart(itemId);
    } else {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, qty: i.qty - 1 } : i
        ),
      }));
    }
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.qty, 0);
  },

  getCount: () => {
    return get().items.reduce((count, item) => count + item.qty, 0);
  },

  getItemQty: (itemId) => {
    return get().items.find((i) => i.id === itemId)?.qty ?? 0;
  },
}));
