FROM node:18-alpine3.17
WORKDIR /app

RUN npm i -g ts-patch@2.0.1

COPY tsconfig*.json ./
COPY package*.json ./
COPY src ./src
COPY .env ./
RUN npm ci
RUN npm run build

CMD ["dist/index.js"]
