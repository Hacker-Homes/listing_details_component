FROM node:latest

RUN mkdir -p /src/info

WORKDIR /src/info

COPY . /src/info

RUN npm install

EXPOSE 3002

CMD [ "npm", "start" ]