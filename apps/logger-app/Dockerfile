FROM node:17-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build logger-app

FROM node:17-alpine As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN nmp run build logger-app


CMD [ "node", "dist/apps/logger-app/main" ]