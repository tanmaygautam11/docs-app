FROM node:20

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY client .

CMD ["npm","run","dev"]