# Lagoon UI

Lagoon UI that primarily only has the Lagoon API and Keycloak services required for rapid development and testing the UI. This repo also includes Storybook and the necessary mock data pulled from uselagoon/lagoon.

## Table of Contents
1. Project Description
2. Usage
3. Contribution

## Project Description
- longer description here -

## Usage

### Local Development

```
make install        # will build all images and run the containers
make logs           # to tail all container logs
make get_creds      # returns an admin API token
```

You will need to define both the `GRAPHQL_API` and `KEYCLOAK_API` environment variables depending on the endpoints you want to connect to, for example:

```
# Local
GRAPHQL_API=http://localhost:3000/graphql
KEYCLOAK_API=http://localhost:8088/auth

# Pygmy

GRAPHQL_API=http://lagoon-ui-beta.docker.amazee.io:3000/graphql
KEYCLOAK_API=http://lagoon-ui-beta.docker.amazee.io:8088/auth

# Lagoon Core (cluster)
GRAPHQL_API=http://localhost:7070/graphql
KEYCLOAK_API=http://localhost:8080/auth

# Remote Lagoon
GRAPHQL_API=https://api.lagoon.amazeeio.cloud/graphql
KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth
```

### Local data watcher pusher container
Part of the build process will install mock data for the `api-db` so you have projects and environments to work from. This data is mounted to `/local-dev` and you are able to modify the content here as you please. If you make changes you will need to restart the `local-data-watcher-pusher` container which will remove all the current database content that's there and re-add again.

### Storybook

Storybook is built with `make build-storybook` and to run `make storybook`

When the api container is spun up it will mount the mock data inside of `services/api/src` from the lagoon/api image. You can then update the mock data locally and the changes will reflect inside of storybook.

### Pointing to production Lagoon endpoints for testing

We can also define our local api and keycloak endpoints to point to our remote api and keycloak. This can be defined inside `.env.*` our files:

```
GRAPHQL_API=https://api.lagoon.amazeeio.cloud/graphql
KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth
```

## Increasing payload limits when bulk adding projects

```
// Automatically decode json.
app.use(json({limit: '250mb'}));
app.use(express.urlencoded({limit: '250mb'}));
```

### Keycloak

Keycloak comes with its own client-side Javscript adapter library that is reachable from our Lagoon keycloak (at https://keycloak.amazeeio.cloud/auth/js/keycloak.js).

We can include this adapter script into our application directly from the server so it remains up-to-date.

```
<script src="https://keycloak.amazeeio.cloud/auth/js/keycloak.js"></script>
```

## Contribution
- info here -
