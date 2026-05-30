import type { ThemeMode } from '../store/themeStore';

export const lightColors = {
  background: '#FAF8F5',
  surface: '#FFFFFF',
  surfaceMuted: '#FFF3E8',
  text: '#171717',
  textMuted: '#6F6A64',
  textSoft: '#AAA29A',
  border: '#EEE7DF',
  primary: '#F36B21',
  primaryDark: '#D94F11',
  danger: '#DC2626',
  dangerSurface: '#FEF2F2',
  darkSurface: '#15110E',
};

export const darkColors = {
  background: '#0F0D0B',
  surface: '#191512',
  surfaceMuted: '#261D17',
  text: '#FFF9F2',
  textMuted: '#CFC3B8',
  textSoft: '#8E8278',
  border: '#2B241E',
  primary: '#FF7A2B',
  primaryDark: '#F36B21',
  danger: '#F87171',
  dangerSurface: '#3B1116',
  darkSurface: '#020617',
};

export function getThemeColors(mode?: ThemeMode) {
  return mode === 'dark' ? darkColors : lightColors;
}
export const Colors = {
  dark: '#0B1120',
  dark2: '#111827',
  primary: '#F97316',
  text: '#F8FAFC',
  textMuted: '#CBD5E1',
  borderActive: '#F97316',
};

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
