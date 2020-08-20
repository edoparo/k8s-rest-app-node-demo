FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY index.js /usr/src/app
RUN npm install --production

EXPOSE 3000

CMD npm start
