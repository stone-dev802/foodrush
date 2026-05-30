# Tester l'API FoodRush

## 1. Relancer le backend

Depuis la racine du projet:

```bash
cd backend
npm install
npm run dev
```

Si le backend etait deja lance avant les dernieres modifications, arrete-le avec `Ctrl+C`, puis relance `npm run dev`.

## 2. Tester dans le navigateur du PC

Ces URLs doivent repondre:

```txt
http://localhost:4000/
http://localhost:4000/health
http://localhost:4000/api/restaurants
```

Important: `Cannot GET /` veut dire que le serveur lance n'a pas encore la route `/` chargee. Il faut redemarrer le backend.

## 3. Tester depuis le telephone

Sur le telephone, l'application appelle:

```txt
http://192.168.43.150:4000/api
```

Le PC et le telephone doivent etre sur le meme reseau. Si l'IP du PC change, il faut modifier `API_HOST` dans:

```txt
src/services/api.ts
```

## 4. Routes disponibles

Restaurants:

```txt
GET /api/restaurants
GET /api/restaurants/:id
```

Auth:

```txt
POST /api/auth/register
POST /api/auth/login
```

Exemple register:

```json
{
  "name": "ThomyStone",
  "email": "test@mail.com",
  "password": "123456"
}
```

## 5. Comportement app mobile

Pour les restaurants:

- si l'API repond, l'app affiche `Source: API backend`
- si l'API ne repond pas, l'app garde les donnees locales

Pour login/register:

- si l'API ne repond pas, l'app affiche maintenant une alerte
- l'app ne cree plus une session locale silencieuse
