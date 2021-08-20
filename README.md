# Lagoon UI Beta


# Local dev

# Pointing to production Lagoon endpoints for testing

We can also define our local api and keycloak endpoints to point to our remote api and keycloak. This can be defined inside `.env.*` our files:

```
GRAPHQL_API=https://api.lagoon.amazeeio.cloud/graphql
KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth
```


### Keycloak


Keycloak comes with its own client-side Javscript adapter library that is reachable from our Lagoon keycloak (at https://keycloak.amazeeio.cloud/auth/js/keycloak.js).

We can include this adapter script into our application directly from the server so it remains up-to-date.

```
<script src="https://keycloak.amazeeio.cloud/auth/js/keycloak.js"></script>
```