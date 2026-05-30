# Phase 3 - MongoDB

## Objectif

Utiliser MongoDB comme base de donnees persistante pour FoodRush.

## Stack retenue

- Backend: Node.js + Express + TypeScript
- Base de donnees: MongoDB
- ODM: Mongoose

## Pourquoi MongoDB

- Tres rapide a mettre en place
- Flexible pour les restaurants et menus imbriques
- Bien adapte a une app mobile en evolution
- Plus simple a gerer au debut que des migrations SQL strictes

## Installation

Depuis le dossier `backend`:

```bash
npm install
```

## Configuration

Creer `backend/.env` avec:

```txt
PORT=4000
CORS_ORIGIN=*
MONGODB_URI="mongodb://127.0.0.1:27017/foodrush"
```

Si tu utilises MongoDB Atlas, remplace `MONGODB_URI` par l'URL Atlas.

## Lancer MongoDB local

MongoDB doit etre actif sur ton PC avant le backend.

Ensuite:

```bash
npm run db:seed
npm run dev
```

## Routes a tester

```txt
http://localhost:4000/
http://localhost:4000/health
http://localhost:4000/api/restaurants
```

## Comportement fallback

Si `MONGODB_URI` n'est pas configure, le backend continue avec les donnees en memoire.

Si `MONGODB_URI` est configure, les routes utilisent MongoDB.

## Prochaine suite

Apres validation MongoDB:

- persister les commandes depuis l'app
- persister les utilisateurs
- ajouter hash mot de passe
- ajouter JWT propre
- brancher favoris/adresses sur MongoDB
