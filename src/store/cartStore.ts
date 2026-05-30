import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji?: string;
  category?: string;
  restaurantId?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> | CartItem) => void;
  addToCart: (item: Omit<CartItem, 'quantity'> | CartItem) => void;
  removeItem: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  total: () => number;
};

function addCartItem(items: CartItem[], item: Omit<CartItem, 'quantity'> | CartItem) {
  const existing = items.find((cartItem) => cartItem.id === item.id);

  if (existing) {
    return items.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
    );
  }

  return [...items, { ...item, quantity: 'quantity' in item ? item.quantity || 1 : 1 }];
}

function removeCartItem(items: CartItem[], itemId: string) {
  return items
    .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0);
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: addCartItem(state.items, item) })),
  addToCart: (item) => set((state) => ({ items: addCartItem(state.items, item) })),
  removeItem: (itemId) => set((state) => ({ items: removeCartItem(state.items, itemId) })),
  removeFromCart: (itemId) => set((state) => ({ items: removeCartItem(state.items, itemId) })),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
