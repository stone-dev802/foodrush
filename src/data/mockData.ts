// src/data/mockData.ts

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  popular?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  emoji: string;
  badge: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  category: string;
  tags: string[];
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
  menu: MenuItem[];
}

export const CATEGORIES = [
  { id: 'all',      label: 'Tout',     emoji: '🍽️' },
  { id: 'burger',   label: 'Burgers',  emoji: '🍔' },
  { id: 'pizza',    label: 'Pizza',    emoji: '🍕' },
  { id: 'sushi',    label: 'Sushi',    emoji: '🍣' },
  { id: 'local',    label: 'Local',    emoji: '🍗' },
  { id: 'drinks',   label: 'Boissons', emoji: '🥤' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Burger Palace',
    emoji: '🍔',
    badge: 'Populaire',
    rating: 4.8,
    deliveryTime: '15-25 min',
    distance: '1.2 km',
    category: 'burger',
    tags: ['Américain', 'Fast Food', 'Grillé'],
    deliveryFee: 500,
    minOrder: 3000,
    isOpen: true,
    menu: [
      {
        id: 101,
        name: 'Classic Smash Burger',
        description: 'Boeuf 180g double smashé, cheddar fondu, sauce maison, pickles',
        price: 4500,
        emoji: '🍔',
        category: 'Burgers',
        popular: true,
      },
      {
        id: 102,
        name: 'Double Bacon Burger',
        description: 'Double steak 360g, bacon croustillant, oignons caramélisés',
        price: 5800,
        emoji: '🥓',
        category: 'Burgers',
      },
      {
        id: 103,
        name: 'Veggie Burger',
        description: 'Galette légumes & quinoa, avocat, tomate, laitue croquante',
        price: 3900,
        emoji: '🥗',
        category: 'Burgers',
      },
      {
        id: 104,
        name: 'Cheese Fries',
        description: 'Frites crispy maison, sauce cheddar, ciboulette',
        price: 2200,
        emoji: '🍟',
        category: 'Accompagnements',
        popular: true,
      },
      {
        id: 105,
        name: 'Chicken Wings x6',
        description: 'Ailes de poulet marinées, sauce buffalo ou BBQ',
        price: 3200,
        emoji: '🍗',
        category: 'Accompagnements',
      },
      {
        id: 106,
        name: 'Milkshake Vanille',
        description: 'Glace artisanale, lait entier, vanille de Madagascar',
        price: 2500,
        emoji: '🥛',
        category: 'Boissons',
      },
    ],
  },
  {
    id: 2,
    name: 'Pizza Napoletana',
    emoji: '🍕',
    badge: 'Top noté',
    rating: 4.9,
    deliveryTime: '20-35 min',
    distance: '2.1 km',
    category: 'pizza',
    tags: ['Italien', 'Four à bois', 'Artisanal'],
    deliveryFee: 800,
    minOrder: 5000,
    isOpen: true,
    menu: [
      {
        id: 201,
        name: 'Margherita DOP',
        description: 'Tomate San Marzano, mozzarella di bufala, basilic frais',
        price: 5200,
        emoji: '🍕',
        category: 'Pizzas',
        popular: true,
      },
      {
        id: 202,
        name: 'Quattro Formaggi',
        description: 'Mozzarella, gorgonzola, pecorino, parmigiana reggiano',
        price: 6100,
        emoji: '🧀',
        category: 'Pizzas',
      },
      {
        id: 203,
        name: 'Diavola Spicy',
        description: 'Salami piquant, nduja, chili fresco, mozzarella fior di latte',
        price: 5700,
        emoji: '🌶️',
        category: 'Pizzas',
        popular: true,
      },
      {
        id: 204,
        name: 'Tiramisu Maison',
        description: 'Recette originale italienne, mascarpone, café, cacao',
        price: 2800,
        emoji: '🍰',
        category: 'Desserts',
      },
      {
        id: 205,
        name: 'Salade César',
        description: 'Romaine, parmesan, croûtons, anchois, sauce césar maison',
        price: 3500,
        emoji: '🥗',
        category: 'Entrées',
      },
    ],
  },
  {
    id: 3,
    name: 'Sushi Zen',
    emoji: '🍱',
    badge: 'Nouveau',
    rating: 4.7,
    deliveryTime: '25-40 min',
    distance: '3.4 km',
    category: 'sushi',
    tags: ['Japonais', 'Frais', 'Premium'],
    deliveryFee: 1000,
    minOrder: 8000,
    isOpen: true,
    menu: [
      {
        id: 301,
        name: 'Salmon Box (12 pcs)',
        description: 'Saumon frais Atlantique, avocat, concombre, riz vinaigré',
        price: 7500,
        emoji: '🐟',
        category: 'Boxes',
        popular: true,
      },
      {
        id: 302,
        name: 'Dragon Roll',
        description: 'Crevette tempura, avocat, anguille glacée, sesame grillé',
        price: 8200,
        emoji: '🍣',
        category: 'Rolls',
        popular: true,
      },
      {
        id: 303,
        name: 'Edamame',
        description: 'Haricots de soja cuits à la vapeur, fleur de sel, citron vert',
        price: 1800,
        emoji: '🫛',
        category: 'Accompagnements',
      },
      {
        id: 304,
        name: 'Miso Soup',
        description: 'Bouillon dashi, tofu soyeux, wakame, champignons shiitake',
        price: 1500,
        emoji: '🍲',
        category: 'Soupes',
      },
      {
        id: 305,
        name: 'Thon Spicy (8 pcs)',
        description: 'Thon rouge, sauce sriracha, avocat, tobiko',
        price: 9000,
        emoji: '🔴',
        category: 'Rolls',
      },
    ],
  },
  {
    id: 4,
    name: 'Poulet Braisé 237',
    emoji: '🍗',
    badge: 'Local',
    rating: 4.6,
    deliveryTime: '10-20 min',
    distance: '0.8 km',
    category: 'local',
    tags: ['Camerounais', 'Grillé', 'Épicé'],
    deliveryFee: 300,
    minOrder: 2000,
    isOpen: true,
    menu: [
      {
        id: 401,
        name: 'Poulet Braisé 1/2',
        description: 'Poulet mariné aux épices locales, braisé sur charbon, plantain frit',
        price: 3500,
        emoji: '🍗',
        category: 'Plats',
        popular: true,
      },
      {
        id: 402,
        name: 'Ndolé Complet',
        description: 'Feuilles ndolé aux crevettes et viande, riz blanc ou plantain',
        price: 4200,
        emoji: '🥬',
        category: 'Plats',
        popular: true,
      },
      {
        id: 403,
        name: 'Beignets Haricots',
        description: 'Beignets haricots soufflés traditionnels, sauce piment maison',
        price: 1500,
        emoji: '🫓',
        category: 'Snacks',
      },
      {
        id: 404,
        name: 'Koki Maïs',
        description: 'Galette de maïs traditionnelle, cuite à la vapeur en feuille',
        price: 1000,
        emoji: '🌽',
        category: 'Snacks',
      },
      {
        id: 405,
        name: 'Jus de Gingembre',
        description: 'Gingembre frais pressé, citron, miel, pincée de poivre',
        price: 1200,
        emoji: '🧃',
        category: 'Boissons',
      },
      {
        id: 406,
        name: 'Eru Complet',
        description: 'Feuilles eru, huile de palme, waterleaf, viande fumée',
        price: 4800,
        emoji: '🌿',
        category: 'Plats',
      },
    ],
  },
  {
    id: 5,
    name: 'Le Petit Café',
    emoji: '☕',
    badge: 'Coup de cœur',
    rating: 4.5,
    deliveryTime: '10-15 min',
    distance: '0.5 km',
    category: 'drinks',
    tags: ['Café', 'Pâtisseries', 'Petit-déj'],
    deliveryFee: 200,
    minOrder: 1500,
    isOpen: true,
    menu: [
      {
        id: 501,
        name: 'Café Arabica Bio',
        description: 'Grains Arabica du Mont Cameroun, torréfaction artisanale',
        price: 900,
        emoji: '☕',
        category: 'Cafés',
        popular: true,
      },
      {
        id: 502,
        name: 'Croissant Pur Beurre',
        description: 'Feuilletage maison, beurre AOP, cuit à la commande',
        price: 1200,
        emoji: '🥐',
        category: 'Viennoiseries',
        popular: true,
      },
      {
        id: 503,
        name: 'Smoothie Tropical',
        description: 'Mangue, ananas, gingembre, lait de coco, banane',
        price: 2200,
        emoji: '🥭',
        category: 'Boissons',
      },
      {
        id: 504,
        name: 'Club Sandwich',
        description: 'Poulet grillé, bacon, œuf, tomate, salade, mayo',
        price: 3200,
        emoji: '🥪',
        category: 'Sandwichs',
      },
    ],
  },
];

export const PAYMENT_METHODS = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    subtitle: 'Paiement instantané sécurisé',
    icon: '💛',
  },
  {
    id: 'orange',
    name: 'Orange Money',
    subtitle: 'Paiement sécurisé Orange',
    icon: '🟠',
  },
  {
    id: 'card',
    name: 'Carte Bancaire',
    subtitle: 'Visa / Mastercard',
    icon: '💳',
  },
  {
    id: 'cash',
    name: 'Paiement à la livraison',
    subtitle: 'Espèces uniquement',
    icon: '💵',
  },
];
