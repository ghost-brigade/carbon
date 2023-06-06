FROM node:20

WORKDIR /app
COPY . .

RUN npm install --include=dev

CMD ["npx", "nx", "serve", "backend"]
