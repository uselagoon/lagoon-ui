module.exports = {
  publicRuntimeConfig: {
    GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
    GRAPHQL_API: process.env.GRAPHQL_API,
    KEYCLOAK_API: process.env.KEYCLOAK_API,
    LAGOON_UI_ICON: process.env.LAGOON_UI_ICON,
    LAGOON_VERSION: process.env.LAGOON_VERSION,
    LAGOON_UI_TASK_BLOCKLIST: [],
  },
  serverRuntimeConfig: {},
};
