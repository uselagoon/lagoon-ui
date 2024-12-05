# Node builder image
FROM uselagoon/node-22-builder:latest AS builder

COPY . /app/

RUN yarn install --network-timeout 300000

# Node service image
FROM uselagoon/node-22:latest

ARG LAGOON_VERSION
ENV LAGOON_VERSION=$LAGOON_VERSION

# Copy the node_modules from node builder
COPY --from=builder /app/node_modules /app/node_modules

# Copying files from ui service
COPY . /app/

ARG GRAPHQL_API
ENV GRAPHQL_API=$GRAPHQL_API

ARG AUTH_KEYCLOAK_ID
ENV AUTH_KEYCLOAK_ID=$AUTH_KEYCLOAK_ID

ARG AUTH_KEYCLOAK_SECRET
ENV AUTH_KEYCLOAK_SECRET=$AUTH_KEYCLOAK_SECRET

ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET

ARG AUTH_KEYCLOAK_ISSUER
ENV AUTH_KEYCLOAK_ISSUER=$AUTH_KEYCLOAK_ISSUER

ARG AUTH_URL
ENV AUTH_URL=$LAGOON_ROUTE
# Build app
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
