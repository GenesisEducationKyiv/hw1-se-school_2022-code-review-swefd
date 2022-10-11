FROM node:17-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build gses2-app

FROM node:17-alpine As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build gses2-app

EXPOSE 8080

CMD [ "node", "dist/apps/gses2-app/src/main.ts" ]