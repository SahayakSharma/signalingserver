FROM node:22-alpine

WORKDIR /src

COPY package* ./

RUN npm install

RUN npm install typescript --save-dev

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node","dist/index.js"]