# Backend + Base de donnees FoodRush

## Choix retenu

- Backend: Node.js + Express + TypeScript
- Base de donnees: MongoDB
- ODM: Mongoose

MongoDB est un bon choix ici parce que les donnees FoodRush sont naturellement flexibles: restaurants, menus imbriques, commandes, profils, adresses et favoris.

## Structure backend

```txt
backend/
  src/
    api/
    config/
    data/
    models/
    scripts/
    services/
    app.ts
    server.ts
  package.json
  .env.example
```

## Collections principales

```txt
users
restaurants
orders
payments
addresses
```

## API actuelle

```txt
GET  /
GET  /health
GET  /api/restaurants
GET  /api/restaurants/:id
POST /api/auth/register
POST /api/auth/login
GET  /api/orders
POST /api/orders
POST /api/payments/fake
```

## Configuration MongoDB

Creer `backend/.env`:

```txt
PORT=4000
CORS_ORIGIN=*
MONGODB_URI="mongodb://127.0.0.1:27017/foodrush"
```

## Commandes

```bash
cd backend
npm install
npm run db:seed
npm run dev
```

## Fallback

Si `MONGODB_URI` n'est pas configure, le backend continue avec les donnees en memoire. Cela permet de tester l'app sans bloquer sur la BD.
