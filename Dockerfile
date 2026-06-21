FROM node:20-alpine

ENV NODE_ENV=production

RUN apk add --no-cache python3 make g++ gcc

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
