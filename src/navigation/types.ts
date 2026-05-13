// src/navigation/types.ts

import { Restaurant } from '../data/mockData';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  RestaurantDetails: { restaurant: Restaurant };
  Payment: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};
