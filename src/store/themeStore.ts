import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      const nextMode = state.mode === 'light' ? 'dark' : 'light';
      return { mode: nextMode, isDark: nextMode === 'dark' };
    }),
  setTheme: (mode) => set({ mode, isDark: mode === 'dark' }),
}));

export function getSafeThemeMode(mode?: ThemeMode) {
  return mode === 'dark' ? 'dark' : 'light';
}
