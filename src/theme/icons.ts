export function getCategoryIcon(category: string): string {
  const key = category.toLowerCase();

  if (key.includes('all') || key.includes('tout')) return 'silverware-fork-knife';
  if (key.includes('burger') || key.includes('fast')) return 'hamburger';
  if (key.includes('pizza')) return 'pizza';
  if (key.includes('sushi')) return 'fish';
  if (key.includes('local') || key.includes('afric')) return 'pot-steam';
  if (key.includes('drink') || key.includes('boisson')) return 'cup';
  if (key.includes('dessert')) return 'cake-variant';
  if (key.includes('breakfast') || key.includes('petit')) return 'coffee';

  return 'food';
}

export function getFoodIcon(token: string, category?: string): string {
  const key = `${token} ${category ?? ''}`.toLowerCase();

  if (key.includes('burger') || key.includes('🍔')) return 'hamburger';
  if (key.includes('pizza') || key.includes('🍕')) return 'pizza';
  if (key.includes('sushi') || key.includes('🍣')) return 'fish';
  if (key.includes('rice') || key.includes('riz') || key.includes('🍱')) return 'rice';
  if (key.includes('chicken') || key.includes('poulet') || key.includes('🍗')) return 'food-drumstick';
  if (key.includes('coffee') || key.includes('cafe') || key.includes('☕')) return 'coffee';
  if (key.includes('salad') || key.includes('salade') || key.includes('🥗')) return 'leaf';
  if (key.includes('fries') || key.includes('frites') || key.includes('🍟')) return 'french-fries';
  if (key.includes('drink') || key.includes('boisson') || key.includes('🥛')) return 'cup';
  if (key.includes('cheese') || key.includes('fromage') || key.includes('🧀')) return 'cheese';
  if (key.includes('spicy') || key.includes('piment') || key.includes('🌶')) return 'chili-mild';
  if (key.includes('cake') || key.includes('gateau') || key.includes('🍰')) return 'cake-variant';
  if (key.includes('sandwich') || key.includes('🥪')) return 'food-variant';
  if (key.includes('croissant') || key.includes('🥐')) return 'food-croissant';
  if (key.includes('corn') || key.includes('mais') || key.includes('🌽')) return 'corn';
  if (key.includes('mango') || key.includes('mangue') || key.includes('🥭')) return 'fruit-cherries';

  return getCategoryIcon(category ?? token);
}

export function getPaymentIcon(methodId: string): string {
  const key = methodId.toLowerCase();

  if (key.includes('mtn')) return 'cellphone-wireless';
  if (key.includes('orange')) return 'cellphone-nfc';
  if (key.includes('card') || key.includes('carte')) return 'credit-card-outline';
  if (key.includes('cash') || key.includes('espece')) return 'cash';

  return 'wallet-outline';
}

export function getProfileMenuIcon(label: string): string {
  const key = label.toLowerCase();

  if (key.includes('commande')) return 'receipt-text-outline';
  if (key.includes('adresse')) return 'map-marker-outline';
  if (key.includes('paiement')) return 'credit-card-outline';
  if (key.includes('favori')) return 'heart-outline';
  if (key.includes('promo')) return 'ticket-percent-outline';
  if (key.includes('notification')) return 'bell-outline';
  if (key.includes('secur') || key.includes('confidential')) return 'shield-check-outline';
  if (key.includes('aide') || key.includes('support')) return 'help-circle-outline';
  if (key.includes('condition')) return 'file-document-outline';

  return 'chevron-right-circle-outline';
}
