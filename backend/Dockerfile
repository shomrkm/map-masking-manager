FROM node:14.17-alpine

ENV PROJECT_ROOTDIR /usr/src/api

WORKDIR $PROJECT_ROOTDIR

COPY package.json tsconfig.json $PROJECT_ROOTDIR
COPY package.json tsconfig.json yarn.lock $PROJECT_ROOTDIR

RUN yarn install

COPY . $PROJECT_ROOTDIR

EXPOSE 5000

CMD ["yarn", "start"]
