import { create } from 'zustand';

type FavoritesState = {
  favoriteRestaurantIds: string[];
  isFavorite: (restaurantId: string | number) => boolean;
  toggleFavorite: (restaurantId: string | number) => void;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteRestaurantIds: [],
  isFavorite: (restaurantId) => get().favoriteRestaurantIds.includes(String(restaurantId)),
  toggleFavorite: (restaurantId) =>
    set((state) => {
      const id = String(restaurantId);
      const exists = state.favoriteRestaurantIds.includes(id);

      return {
        favoriteRestaurantIds: exists
          ? state.favoriteRestaurantIds.filter((item) => item !== id)
          : [...state.favoriteRestaurantIds, id],
      };
    }),
}));
