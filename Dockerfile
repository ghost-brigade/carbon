FROM node:18-alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache make gcc g++ python3
RUN npm install --include=dev
RUN apk del make gcc g++ python3

CMD ["npx", "nx", "serve", "backend"]
