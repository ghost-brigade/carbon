# Carbon

## Getting started

Copy .env.example in `./apps/backend` and update DATABASE_URL based on docker-compose.yml

```
docker compose up
make init
npx nx serve backend
npx nx serve frontend
```