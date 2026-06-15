FROM node:24.14.1-alpine3.23 AS base
WORKDIR /app

COPY package*.json .

RUN npm install

FROM base AS dev

COPY . .

EXPOSE 3000

# Au démarrage : on attend que Postgres soit prêt (depends_on s'en occupe),
# puis on applique les migrations Drizzle et on lance Nuxt en dev.
CMD ["sh", "-c", "npx nuxt db migrate && npm run dev"]