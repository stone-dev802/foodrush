export const API_HOST = 'http://192.168.43.150:4000';
export const API_BASE_URL = `${API_HOST}/api`;

export type ApiRestaurant = {
  id: string | number;
  name: string;
  category: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  emoji?: string;
  badge?: string;
  tags?: string[];
  deliveryFee?: number;
  minOrder?: number;
  isOpen?: boolean;
  menu?: ApiMenuItem[];
};

export type ApiMenuItem = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji?: string;
  popular?: boolean;
};

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type ApiOrderItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  restaurantId?: string | number;
};

export type ApiOrder = {
  id: string;
  userId?: string;
  customerName?: string;
  items: ApiOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  health: () => fetch(`${API_HOST}/health`).then((response) => response.json() as Promise<{ status: string; service: string }>),
  login: (input: { email: string; password: string }) =>
    request<{ user: ApiUser; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  register: (input: { name: string; email: string; password: string }) =>
    request<{ user: ApiUser; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  getRestaurants: () => request<ApiRestaurant[]>('/restaurants'),
  getRestaurant: (id: string) => request<ApiRestaurant>(`/restaurants/${id}`),
  createOrder: (input: { userId?: string; customerName?: string; items: ApiOrderItem[]; paymentMethod: string }) =>
    request<ApiOrder>('/orders', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  getOrders: (userId?: string) => request<ApiOrder[]>(userId ? `/orders?userId=${encodeURIComponent(userId)}` : '/orders'),
  fakePayment: (input: { amount: number; method: string }) =>
    request<{ id: string; status: string; method: string; amount: number; createdAt: string }>('/payments/fake', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};

export async function getRestaurants() {
  return api.getRestaurants();
}
