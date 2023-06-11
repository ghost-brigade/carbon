FROM node:lts-alpine as build

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat g++ make python3
WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npx nx build frontend
RUN npx nx build backend

# ======================== #

FROM caddy:2.4.5-alpine as proxyx

COPY --from=build /app/dist/apps/frontend /usr/share/caddy
COPY ./Caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

EXPOSE 80
EXPOSE 443

# ======================== #

FROM node:lts-alpine as api

ENV NODE_ENV production
ENV PORT 3000

COPY --from=build /app/dist/apps/backend .

RUN apk add --no-cache dumb-init

RUN npm ci --only=production
RUN npm install pm2

RUN chown -R node:node .

USER node
EXPOSE 3000

CMD ["dumb-init", "npx", "pm2-runtime", "main.js"]
