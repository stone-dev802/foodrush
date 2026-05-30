import { Restaurant } from '../models/restaurant.js';

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'FoodRush Grill',
    category: 'burger',
    emoji: '🍔',
    badge: 'Populaire',
    rating: 4.8,
    distance: '1.2 km',
    deliveryTime: '25-35 min',
    tags: ['Burger', 'Grill', 'Fast food'],
    deliveryFee: 500,
    minOrder: 3000,
    isOpen: true,
    menu: [
      {
        id: 'm1',
        name: 'Burger signature',
        description: 'Burger maison, fromage, sauce FoodRush.',
        price: 3500,
        category: 'burger',
        emoji: '🍔',
        popular: true
      },
      {
        id: 'm2',
        name: 'Poulet braise',
        description: 'Poulet marine, frites et sauce epicee.',
        price: 4500,
        category: 'local',
        emoji: '🍗'
      }
    ]
  },
  {
    id: 'r2',
    name: 'Douala Bowl',
    category: 'local',
    emoji: '🍱',
    badge: 'Local',
    rating: 4.6,
    distance: '2.4 km',
    deliveryTime: '30-45 min',
    tags: ['Local', 'Riz', 'Poulet'],
    deliveryFee: 700,
    minOrder: 2500,
    isOpen: true,
    menu: [
      {
        id: 'm3',
        name: 'Riz saute',
        description: 'Riz saute aux legumes et poulet.',
        price: 3000,
        category: 'local',
        emoji: '🍱',
        popular: true
      }
    ]
  }
];
