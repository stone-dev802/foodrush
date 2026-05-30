import { useEffect, useState } from 'react';
import { api, ApiRestaurant } from '../services/api';
import { RESTAURANTS } from '../data/mockData';

export function useRestaurantDetails(restaurantId?: string | number) {
  const fallback =
    RESTAURANTS.find((restaurant) => String(restaurant.id) === String(restaurantId)) ?? RESTAURANTS[0];
  const [restaurant, setRestaurant] = useState<ApiRestaurant | undefined>(fallback as ApiRestaurant);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'api' | 'mock'>('mock');

  useEffect(() => {
    let mounted = true;

    async function loadRestaurant() {
      if (!restaurantId) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.getRestaurant(String(restaurantId));

        if (!mounted) {
          return;
        }

        setRestaurant(data);
        setSource('api');
      } catch {
        if (!mounted) {
          return;
        }

        setRestaurant(fallback as ApiRestaurant);
        setSource('mock');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRestaurant();

    return () => {
      mounted = false;
    };
  }, [restaurantId]);

  return { restaurant, loading, source };
}
