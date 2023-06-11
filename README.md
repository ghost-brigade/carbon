# Carbon

## Taches

| Nom | Tache |
|-----|-------|
| Louis M.  | Initialisation prisma |
| Louis M.  | Schéma prisma de base |
| Louis M.  | CRUD school, skill, society, tasklist, user-preference |
| Louis M.  | Ajout/Suppression préference à un utilisateur |
| Louis M.  | Ajout tasklist à un utilisateur |
| Louis M.  | Ajout skill à un utilisateur |
| Louis M.  | Travail sur les seed |
| Louis M.  | Vérification des routes avec RoleGuard |
| Louis M.  | Feedback sur mission |
| Louis M. | Travail sur types Zod |
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