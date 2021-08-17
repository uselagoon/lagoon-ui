# Lagoon UI



### Keycloak


Keycloak comes with its own client-side Javscript adapter library that is reachable from our Lagoon keycloak (at https://keycloak.amazeeio.cloud/auth/js/keycloak.js).

We can include this adapter script into our application directly from the server so it remains up-to-date.

```
<script src="https://keycloak.amazeeio.cloud/auth/js/keycloak.js"></script>
```

We also need to define our local keycloak to point to the remote keycloak as shown inside `.env.local`:

```
KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth
```