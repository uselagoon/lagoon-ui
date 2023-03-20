# Node builder image
FROM uselagoon/node-16-builder:latest as builder

WORKDIR /app/

COPY package.json .
COPY yarn.lock .
 
RUN yarn install

# Node service image
FROM uselagoon/node-16:latest

ARG LAGOON_VERSION
ENV LAGOON_VERSION=$LAGOON_VERSION

# Copy the node_modules from node builder
COPY --from=builder /app/node_modules /app/node_modules

# Copying files from ui service
COPY ./src/ ./src
COPY package.json .
COPY yarn.lock .
COPY server.js .
COPY plugins.json .

# Making sure we run in production
ENV NODE_ENV=production

ARG KEYCLOAK_API
ENV KEYCLOAK_API=$KEYCLOAK_API

ARG GRAPHQL_API
ENV GRAPHQL_API=$GRAPHQL_API

# Build app
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]