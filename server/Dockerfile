FROM node:22.1.0

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon


COPY  . .

EXPOSE 6003

CMD ["npm","run","server"]