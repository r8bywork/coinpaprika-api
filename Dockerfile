## build environment
#FROM node:18-alpine as build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install --force
#COPY . ./
#EXPOSE 5173
#RUN npm run build
#CMD ["npm", "run", "dev"]

FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


# production environment
#FROM nginx:1.21.0-alpine
#COPY --from=build /app/dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 5173
#CMD [ "nginx", "-g", "daemon off;" ]
