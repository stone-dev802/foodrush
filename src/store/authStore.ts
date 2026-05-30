import { create } from 'zustand';
import { ApiUser } from '../services/api';

type AuthState = {
  user: ApiUser | null;
  token: string | null;
  setSession: (session: { user: ApiUser; token: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setSession: ({ user, token }) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
