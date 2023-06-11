# Carbon

## Taches

| Nom | Tache |
|-----|-------|
| Louis M.  | Initialisation prisma |
|   | Schéma prisma de base |
|   | CRUD school, skill, society, tasklist, user-preference |
|   | Ajout/Suppression préference à un utilisateur |
|   | Ajout tasklist à un utilisateur |
|   | Ajout skill à un utilisateur |
|   | Travail sur les seed |
|   | Vérification des droits des routes |
|   | Feedback sur mission |
|  | Vérification des schémas |
| Alexis L. | Profile utilisateur |
| Anthony A. | xxx |
| Julien A. | xxx |
| Stanley C. | xxx |


## Getting started

Pour commencer à travailler avec ce projet, copiez le fichier .env.example dans `./apps/backend` et mettez à jour `DATABASE_URL` en fonction de `docker-compose.yml`.

Par défaut :

```
NODE_ENV=development
DATABASE_URL="postgresql://root:password@localhost:5432/carbon?schema=public"
CORS_ORIGIN=*
JWT_SECRET="secret"
JWT_EXPIRES_IN="1d"
```

## Installation

```
docker compose up
make init
npx nx serve backend
npx nx serve frontend
```