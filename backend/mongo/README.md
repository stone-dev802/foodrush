# Import MongoDB Compass pour FoodRush

## Base de donnees

Nom conseille : `foodrush`

URL Atlas :

```txt
mongodb+srv://ndzanathomas119_db_foodrush:<PASSWORD>@cluster0.ktlztew.mongodb.net/foodrush
```

Remplace `<PASSWORD>` par ton mot de passe Atlas.

## Collections a creer/importer

Dans MongoDB Compass :

1. Connecte-toi avec ton URL Atlas.
2. Cree une base de donnees nommee `foodrush`.
3. Cree/import les collections suivantes :

| Collection | Fichier a importer |
| --- | --- |
| `restaurants` | `backend/mongo/restaurants.json` |
| `users` | `backend/mongo/users.json` |
| `orders` | `backend/mongo/orders.json` |

## Configuration backend

Dans `backend/.env`, mets :

```env
PORT=4000
MONGODB_URI=mongodb+srv://ndzanathomas119_db_foodrush:<PASSWORD>@cluster0.ktlztew.mongodb.net/foodrush
```

Puis lance le backend :

```bash
cd backend
npm run dev
```

Tests rapides :

```txt
http://localhost:4000/health
http://localhost:4000/api/restaurants
```

## Important

Si l'APK doit utiliser ce backend, l'API ne doit pas rester sur `localhost` ou `192.168.43.150`.
Il faudra heberger le backend et mettre son URL publique dans l'application.
