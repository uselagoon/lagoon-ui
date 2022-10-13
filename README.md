## Lagoon UI

The main user interface and dashboard for [Lagoon](https://github.com/uselagoon/lagoon). 

## Build

To build and test changes locally the Lagoon UI can be built via Yarn or Docker.

Testing locally, the UI can be connected to production or development Lagoon instances. Here we have included the URLs for the amazee.io cloud, but you can substitute your own.

### Yarn
Note: Within `docker-compose.yml` `GRAPHQL_API` & `KEYCLOAK_API` are set to localhost by default.

```
yarn install
yarn build && GRAPHQL_API=https://api.lagoon.amazeeio.cloud/graphql KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth yarn dev
```
These values can also be updated in `docker-compose.yml`.

### Docker
Note: Within `docker-compose.yml` `GRAPHQL_API` & `KEYCLOAK_API` will need to be set to 
```
  GRAPHQL_API: "${GRAPHQL_API:-https://api.lagoon.amazeeio.cloud/graphql}"
  KEYCLOAK_API: "${KEYCLOAK_API:-https://keycloak.amazeeio.cloud/auth}"
```

```
docker-compose build
docker-compose up -d
```

This project is tested with BrowserStack.
