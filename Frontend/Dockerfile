FROM node:18-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM httpd:2.4-alpine

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80