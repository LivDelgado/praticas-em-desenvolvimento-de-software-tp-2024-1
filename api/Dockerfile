FROM node:19.7.0-alpine3.16 As development

WORKDIR /usr/src/app

COPY ["package.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install --only=development
RUN npm run build

FROM node:19.7.0-alpine3.16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD npm run start:dev
