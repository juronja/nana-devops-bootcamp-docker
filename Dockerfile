#installs the base layer a simple ubuntu os
FROM node:21-alpine

RUN mkdir /opt/app

#this tells in which folder the next commands will work
WORKDIR /opt/app

COPY . ./

RUN npm install --omit=dev

#this only suggest the port this server is listening. Web servers are usualy port 80
EXPOSE 3000

CMD npm start
