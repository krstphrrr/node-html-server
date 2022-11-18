# FROM node:18-alpine3.15 AS development
FROM node:19-alpine3.15 AS build

WORKDIR /usr/src/app

COPY --chown=node:node ./package*.json ./

RUN npm ci

COPY --chown=node:node ./src .


ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

# FROM node:18-alpine3.15 As production
FROM node:19-alpine3.15 As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/ ./dist
EXPOSE 5000
CMD [ "node", "dist/index.js" ]