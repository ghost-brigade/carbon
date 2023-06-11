FROM node:lts-alpine as build

ENV NODE_ENV production
ENV PORT 3000

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why l>
RUN apk add --no-cache libc6-compat g++ make python3
WORKDIR /usr/src/app

COPY . .

RUN npm install --include=dev
RUN npm run generate
