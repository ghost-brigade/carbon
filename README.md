# Carbon

## Taches

| Nom                                | Domaine  | Tache                                                      |
| ---------------------------------- | -------- | ---------------------------------------------------------- |
| Alexis LOURS (alexislours)         | Frontend | Authentification et gestion de rôles                       |
|                                    |          | Request service type-safe                                  |
|                                    |          | Application mobile Capacitor                               |
|                                    |          | Animations                                                 |
|                                    |          | Navbar                                                     |
|                                    |          | Routing Front                                              |
|                                    |          | Gestion des erreurs client                                 |
|                                    |          | Page profil (préférences, feedback et autres info…)        |
|                                    |          | Page de connexion                                          |
|                                    |          | Graphs de salaire et TJM pour la RH                        |
|                                    |          | Page leaderboard                                           |
|                                    |          | Composant toast et loader                                  |
|                                    |          | Page d'admininistration skills, missions, news et sociétés |
|                                    |          | Page de grestions de taches/progrès utilisateur            |
| Anthony ARJONA (AnthonyARJONA)     | Backend  | Authentification et gestion de rôles                       |
|                                    |          | Gestion de fichier avec S3 (Cloudflare R2)                 |
|                                    |          | Backend Leaderboard                                        |
|                                    |          | CRUD Sociétés                                              |
|                                    |          | CRUD Préférences utilisateurs                              |
|                                    |          | Système de recherche                                       |
|                                    |          | Seeding                                                    |
|                                    |          | Mise en production                                         |
|                                    |          | Création des schémas BDD (Prisma)                          |
|                                    |          | Protection des routes avec des guard                       |
|                                    |          | BDD Postgres avec Docker                                   |
| Louis MOULIN (MoulinLours)         | Backend  | Initialisation prisma                                      |
|                                    |          | Schéma prisma de base                                      |
|                                    |          | CRUD school, skill, society, tasklist, user-preference     |
|                                    |          | Ajout/Suppression préference à un utilisateur              |
|                                    |          | Ajout tasklist à un utilisateur                            |
|                                    |          | Ajout skill à un utilisateur                               |
|                                    |          | Travail sur les seed                                       |
|                                    |          | Vérification des droits des routes                         |
|                                    |          | Feedback sur mission                                       |
|                                    |          | Vérification des schémas                                   |
|                                    |          | Mise en place des relations                                |
| Julien ARBELLINI (JulienArbellini) | Backend  | Creation schema Mission, Event, Ressource                  |
|                                    |          | Creation schema User                                       |
|                                    |          | CRUD News, Event, Ressource                                |
|                                    |          | Seeds events et news                                       |
|                                    | Frontend | Page News                                                  |
|                                    |          | Page Event                                                 |
|                                    |          | Page Ressource                                             |
|                                    | Autre    | Aide maquettes/design                                      |
| Stanley CRICO (3kezoh)             | Frontend | Page de recherche                                          |
|                                    | Backend  | Filtres sur la liste des utilisateurs                      |

## Getting started

Copy .env.example in `./apps/backend` and update DATABASE_URL based on docker-compose.yml

Change `./apps/frontend/src/app/constants/api.constants.ts` to match your backend url

## Installation

```
docker compose up
make init
npx nx serve backend
npx nx serve frontend
```
