FROM node:carbon

WORKDIR /usr/app

COPY package*.json ./

EXPOSE 9999

RUN npm install