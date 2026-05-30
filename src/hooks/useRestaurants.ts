import { useEffect, useState } from 'react';
import { api, ApiRestaurant } from '../services/api';
import { RESTAURANTS } from '../data/mockData';

type LoadState = {
  restaurants: ApiRestaurant[];
  loading: boolean;
  source: 'api' | 'mock';
  error: string | null;
};

export function useRestaurants() {
  const [state, setState] = useState<LoadState>({
    restaurants: RESTAURANTS as ApiRestaurant[],
    loading: true,
    source: 'mock',
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function loadRestaurants() {
      try {
        const data = await api.getRestaurants();

        if (!mounted) {
          return;
        }

        setState({
          restaurants: data.length ? data : (RESTAURANTS as ApiRestaurant[]),
          loading: false,
          source: data.length ? 'api' : 'mock',
          error: null,
        });
      } catch (error) {
        if (!mounted) {
          return;
        }

        setState({
          restaurants: RESTAURANTS as ApiRestaurant[],
          loading: false,
          source: 'mock',
          error: error instanceof Error ? error.message : 'API unavailable',
        });
      }
    }

    loadRestaurants();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
