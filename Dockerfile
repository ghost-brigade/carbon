FROM node:lts-alpine as build

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be need>
RUN apk add --no-cache libc6-compat g++ make python3
WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run generate
RUN npm run seed

RUN npx nx build frontend
RUN npx nx build backend

# ======================== #

FROM caddy:2.4.5-alpine as proxy

COPY --from=build /usr/src/app/dist/apps/frontend /usr/share/caddy
COPY ./Caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

EXPOSE 80
EXPOSE 443

# ======================== #

FROM node:lts-alpine as api

ENV NODE_ENV production
ENV PORT 3000

COPY --from=build /usr/src/app/dist/apps/backend .
COPY --from=build /usr/src/app/apps/backend/prisma ./prisma
COPY --from=build /usr/src/app/apps/backend/.env .env

RUN apk add --no-cache dumb-init

RUN npm ci --only=production
RUN npx prisma generate
RUN npm install pm2

EXPOSE 3000

CMD ["dumb-init", "npx", "pm2-runtime", "main.js"]
