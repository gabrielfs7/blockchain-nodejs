FROM node:carbon

WORKDIR /usr/app

COPY package*.json ./

EXPOSE 3000

RUN npm install