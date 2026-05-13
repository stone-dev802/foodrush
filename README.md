# 🍔 FoodRush — Application Food Delivery

Projet mobile React Native / Expo (Exercice 2 du PDF)

## Stack technique

| Partie       | Technologie           |
|--------------|-----------------------|
| Frontend     | React Native (Expo)   |
| Langage      | TypeScript            |
| Navigation   | React Navigation v6   |
| State        | Zustand               |
| API          | Axios (prêt à brancher)|
| Backend      | Firebase (à configurer)|

---

## Structure du projet

```
food-app/
├── App.tsx                        # Entry point
├── app.json                       # Config Expo
├── tsconfig.json
├── babel.config.js
└── src/
    ├── theme/
    │   └── colors.ts              # Design tokens (couleurs, espacements...)
    ├── data/
    │   └── mockData.ts            # Données mock (5 restaurants, menus...)
    ├── store/
    │   └── cartStore.ts           # Zustand — gestion panier
    ├── navigation/
    │   ├── types.ts               # TypeScript types de navigation
    │   └── AppNavigator.tsx       # Stack + Bottom Tabs
    ├── screens/
    │   ├── SplashScreen.tsx       # Écran de démarrage animé
    │   ├── HomeScreen.tsx         # Liste restaurants + recherche + filtres
    │   ├── RestaurantDetailsScreen.tsx  # Menu du resto + ajout panier
    │   ├── CartScreen.tsx         # Panier avec quantités + récap
    │   ├── PaymentScreen.tsx      # Paiement MTN/Orange/Carte + succès
    │   ├── SearchScreen.tsx       # Recherche full-text
    │   └── ProfileScreen.tsx      # Profil utilisateur
    └── components/
        ├── RestaurantCard.tsx     # Carte restaurant (liste)
        ├── FeaturedCard.tsx       # Carte horizontale (populaires)
        ├── CategoryPill.tsx       # Filtre catégorie
        └── MenuItemCard.tsx       # Item du menu (avec ajout panier)
```

---

## Installation & démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le projet
npx expo start

# 3. Scanner le QR code avec Expo Go (Android/iOS)
# ou appuyer sur 'a' pour Android, 'i' pour iOS
```

---

## Écrans disponibles

1. **Splash** — Logo animé + auto-redirect
2. **Home** — 5 restaurants, recherche live, filtres par catégorie, bannière promo
3. **Restaurant Details** — Menu complet, filtres par section, stats, ajout au panier
4. **Cart** — Gestion quantités, suppression, calcul total, code promo
5. **Payment** — MTN MoMo, Orange Money, Carte, Livraison · Animation succès
6. **Search** — Recherche full-text par nom/tag/plat, catégories
7. **Profile** — Infos utilisateur, menu paramètres

---

## Fonctionnalités implémentées

- [x] Navigation Stack + Bottom Tabs avec badge panier
- [x] Recherche et filtres par catégorie
- [x] Zustand store (addToCart, removeFromCart, incrementQty, decrementQty)
- [x] Écran de détails avec menu groupé par catégorie
- [x] Récapitulatif commande + simulation paiement
- [x] Modal de succès animé
- [x] Design dark mode complet
- [x] Animations (fadeIn, slideUp, spring)
- [x] TypeScript strict

---

## Prochaines étapes (Backend)

```bash
# Installer Firebase
npm install firebase

# Installer AsyncStorage pour persistance
npm install @react-native-async-storage/async-storage
```

Puis dans `src/services/` créer :
- `authService.ts` — Firebase Auth
- `restaurantService.ts` — Firestore / API REST
- `orderService.ts` — Création commandes

---

## Données mockées

5 restaurants disponibles :
- 🍔 Burger Palace (Burgers)
- 🍕 Pizza Napoletana (Pizza)
- 🍱 Sushi Zen (Sushi)
- 🍗 Poulet Braisé 237 (Local camerounais)
- ☕ Le Petit Café (Boissons/Snacks)

---

*Développé dans le cadre de l'Exercice 2 — React Native Food Delivery*
*Institut Supérieur Azimut — Yaoundé, Cameroun 🇨🇲*
