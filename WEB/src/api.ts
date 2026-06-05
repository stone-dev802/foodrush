export const API_HOST = 'https://foodrush-hrsc.onrender.com';
export const API_BASE_URL = `${API_HOST}/api`;

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  city?: string;
  address?: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  badge?: string;
  imageUrl?: string;
  isOpen?: boolean;
  menu?: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
  }>;
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
    throw new Error(`API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (input: { email: string; password: string }) =>
    request<{ user: { id: string; name: string; email: string }; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  restaurants: () => request<Restaurant[]>('/restaurants'),
};
