FROM node:18.17.1

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4200

CMD ["node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]