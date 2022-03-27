FROM node:lts-alpine

WORKDIR /home/node/app

COPY package*.json ./

COPY [^node_modules]* .

ENV PORT=3000

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]