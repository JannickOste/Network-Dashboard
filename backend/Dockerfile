FROM node:25-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:25-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
RUN apk add --no-cache iputils
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/bootstrap.js"]