FROM node:17-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build customer-app

FROM node:17-alpine As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN nmp run build customer-app


CMD [ "node", "dist/apps/customer-app/main" ]