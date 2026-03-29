FROM node:24.14.1-alpine3.23 AS base
WORKDIR /app

COPY package*.json .

RUN npm install

FROM base AS dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]