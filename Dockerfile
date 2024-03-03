FROM node:18-bullseye-slim

WORKDIR /app

COPY yarn*.lock package*.json ./

RUN yarn install && yarn cache clean

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
