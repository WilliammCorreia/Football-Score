FROM node:24.14.1-alpine3.23 AS base
WORKDIR /app
COPY package*.json .
RUN npm install

FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS builder
COPY . .
# PGlite (WASM) termine son Worker thread avec exit code 99 dans Docker Alpine
# après une migration réussie — on capture ce code et on l'accepte comme succès
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build; \
    code=$?; \
    rm -rf .data/; \
    [ "$code" -eq 0 ] || [ "$code" -eq 99 ]

FROM node:24.14.1-alpine3.23 AS prod
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
