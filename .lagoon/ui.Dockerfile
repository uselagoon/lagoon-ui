# Node builder image
FROM uselagoon/node-16-builder:latest as builder

COPY ./services/ui/yarn.lock ./services/ui/package.json /app/

RUN yarn install


# Node service image
FROM uselagoon/node-16:latest

ARG LAGOON_VERSION
ENV LAGOON_VERSION=$LAGOON_VERSION

# Copy the node_modules from node builder
COPY --from=builder /app/node_modules /app/node_modules

# Copying files from ui service
COPY ./services/ui/ /app/

# Making sure we run in production
ENV NODE_ENV=production

ARG KEYCLOAK_API
ENV KEYCLOAK_API=$KEYCLOAK_API

ARG GRAPHQL_API
ENV GRAPHQL_API=$GRAPHQL_API

# Build app
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "run", "start"]
