#FROM node:20-alpine as build
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build

FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80