FROM node:9-alpine

COPY package.json yarn.lock ./

# RUN yarn && npm test
RUN yarn

WORKDIR /app
EXPOSE 3000

ADD . /app

CMD ["yarn", "start"]