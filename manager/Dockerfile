FROM node:18

COPY . ./app

WORKDIR /app

RUN npm install

ENV NODE_ENV production

CMD ["npx", "tsx", "./index.ts"];