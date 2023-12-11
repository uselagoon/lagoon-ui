## Lagoon minimal setup

Use this docker-compose.yml to start a minimal Lagoon Core for testing purposes.

### Running it

Simple! Just run `make up` - this will pull the images, start Lagoon, and auto-configure the passwords.

Lagoon comes built-in with organizations, groups, projects and users.

All usernames have matching passwords (eg user:owner@example.com pass:owner@example.com)

The file is configured to start the API and keycloak on non-usual ports to avoid any collisions

Use `GRAPHQL_API=http://0.0.0.0:33000/graphql KEYCLOAK_API=http://0.0.0.0:38088/auth` with any tools.

