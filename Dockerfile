# Node builder image
FROM uselagoon/node-20-builder:latest AS local-dev

# Copy only what we need into the image
COPY ./src/ /app/src
COPY server.js .
COPY plugins.json .
COPY package.json .
COPY yarn.lock .
COPY tour.json .
COPY tourHash.js .

# Upgrade the yarn version in /app to the most recent to take advantage of new features 
RUN yarn set version berry

# use a buildkit cache for yarn - this is reused in later steps
RUN --mount=type=cache,target=/home/.yarn YARN_CACHE_FOLDER=/home/.yarn yarn install --network-timeout 300000

ARG LAGOON_VERSION
ARG GRAPHQL_API
ARG KEYCLOAK_API
ENV LAGOON_VERSION=$LAGOON_VERSION
ENV GRAPHQL_API=$GRAPHQL_API
ENV KEYCLOAK_API=$KEYCLOAK_API

# Use an intermediate image to build and trim the production image
FROM uselagoon/node-20:latest AS prod-builder

# Copy the whole /app folder from dev
COPY --from=local-dev /app/ /app/

# Build app
RUN --mount=type=cache,target=/home/.yarn YARN_CACHE_FOLDER=/home/.yarn yarn run build
# Remove any node_modules in DevDependencies not needed for production
RUN --mount=type=cache,target=/home/.yarn YARN_CACHE_FOLDER=/home/.yarn yarn workspaces focus -A --production

# Build the final production image
FROM uselagoon/node-20:latest AS prod

# Copy the whole /app folder from prod-builder
COPY --from=prod-builder /app/ /app/

EXPOSE 3000
CMD ["yarn", "start"]
