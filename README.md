## Lagoon UI v2

Under development

to run locally with https://github.com/uselagoon/lagoon/tree/ui-oidc-client branch:

```sh
 yarn && GRAPHQL_API=http://0.0.0.0:33000/graphql AUTH_SECRET=test AUTH_KEYCLOAK_ID=lagoon-ui-oidc AUTH_KEYCLOAK_SECRET=20580a56-6fbc-11ef-9a5b-3b4da292aa54 AUTH_KEYCLOAK_ISSUER=http://0.0.0.0:38088/auth/realms/lagoon yarn build && GRAPHQL_API=http://0.0.0.0:33000/graphql AUTH_SECRET=test AUTH_KEYCLOAK_ID=lagoon-ui-oidc AUTH_KEYCLOAK_SECRET=20580a56-6fbc-11ef-9a5b-3b4da292aa54 AUTH_KEYCLOAK_ISSUER=http://0.0.0.0:38088/auth/realms/lagoon yarn dev

```