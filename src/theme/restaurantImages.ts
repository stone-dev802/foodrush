const restaurantImages: Record<string, string> = {
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
  pizza: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=85',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85',
  local: 'https://images.unsplash.com/photo-1598515214146-dab39da1243d?auto=format&fit=crop&w=900&q=85',
  drinks: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
};

export function getRestaurantImage(category?: string) {
  return restaurantImages[(category ?? '').toLowerCase()] ?? restaurantImages.burger;
}

export const promoBurgerImage =
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85';
