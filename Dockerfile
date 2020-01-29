FROM node:10.16.3-alpine

RUN apk add --update --no-cache git bash

RUN mkdir -p /apps

WORKDIR /apps

ADD . /apps

RUN npm install --production

#RUN npm run build

EXPOSE 3000

CMD npm start
