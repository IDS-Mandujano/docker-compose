FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM httpd:2.4-alpine

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80