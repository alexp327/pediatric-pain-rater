FROM node:18.17.1-alpine as local-base

WORKDIR /app

EXPOSE 4200


# live reload enabled, good for local dev environment
FROM local-base as local

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]

# ****************************************************

# nginx server base for prod
FROM node:18.17.1-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# serve built files using nginx
FROM nginx:latest as prod

COPY --from=build /app/dist/pediatric-pain-rater /usr/share/nginx/html

EXPOSE 80