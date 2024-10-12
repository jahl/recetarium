FROM node:20.17-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "src/server.ts"]