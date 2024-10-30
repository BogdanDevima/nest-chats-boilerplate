# Build Stage

FROM node:16-alpine as builder

# Use the node user from the image (instead of the root user)
USER node

ENV NODE_ENV=production

WORKDIR /opt/${APP_NAME}-backend

# Bundle app source
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --production=false

# Bundle app source
COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN yarn build

# Build Stage

FROM node:16-alpine as runner

USER node

ENV NODE_ENV=production

WORKDIR /opt/${APP_NAME}-backend

RUN yarn global add pm2

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

# Use builder and install only production deps in runner container
RUN yarn cache clean
RUN yarn install --production

COPY --from=builder --chown=node:node /opt/frwrd-backend/dist ./dist

# PM2 configs
COPY --chown=node:node ecosystem.config.js ./

# Start the server using the production build
CMD [ "pm2", "start", "dist/main.js", "--name", "${APP_NAME}-backend" ]

EXPOSE 3001