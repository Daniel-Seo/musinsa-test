FROM node:22-slim

WORKDIR /app

ENV NODE_ENV production

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --chown=node:node . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]