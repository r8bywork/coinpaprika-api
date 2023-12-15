FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build