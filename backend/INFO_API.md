# FoodRush Backend/API

Ce dossier contient l'initialisation du backend de FoodRush.

## Technologie

- Node.js
- Express
- TypeScript
- CORS
- dotenv

## Structure

- `src/server.ts`: lance le serveur HTTP.
- `src/app.ts`: configure Express, CORS, JSON et les routes.
- `src/api/restaurants.ts`: routes API des restaurants.
- `src/services/restaurantService.ts`: logique metier des restaurants.
- `src/models/restaurant.ts`: types TypeScript.
- `src/data/restaurants.ts`: donnees temporaires en local.

## Routes disponibles

Base serveur:

```txt
http://localhost:4000
```

Health check:

```txt
GET /health
```

Liste des restaurants:

```txt
GET /api/restaurants
```

Details d'un restaurant:

```txt
GET /api/restaurants/:id
```

## Lancer le backend

Depuis le dossier `backend`:

```bash
npm install
npm run dev
```

Le serveur affichera:

```txt
FoodRush API listening on http://localhost:4000
```

## Connexion avec l'app mobile

Dans le frontend, le fichier `src/services/api.ts` pointe pour l'instant vers:

```txt
http://192.168.43.150:4000/api
```

Cette IP correspond a ton LAN actuel. Si l'IP du PC change, il faudra mettre la nouvelle IP dans `src/services/api.ts`.

Important: pour tester depuis Expo Go sur telephone, le backend doit etre lance sur le PC et le telephone doit etre sur le meme reseau que le PC.

## Etat actuel

Le backend est initialise, mais l'application mobile continue de pouvoir fonctionner avec ses donnees locales. La prochaine vraie integration consistera a charger les restaurants depuis l'API et a garder un fallback local si le backend est eteint.
