FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm i

COPY . .

EXPOSE 5000 9229

CMD ["npm", "run", "server:dev"]