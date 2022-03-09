const path = require('path');
require('dotenv-extended').load();

const lagoonRoutes = (process.env.LAGOON_ROUTES && process.env.LAGOON_ROUTES.split(',')) || [];

const lagoonApiRoute = lagoonRoutes.find(route => route.includes('api-'));
const envApiRoute = process.env.GRAPHQL_API;

const lagoonKeycloakRoute = lagoonRoutes.find(routes => routes.includes('keycloak-'));
const envKeycloakRoute = process.env.KEYCLOAK_API;

const lagoonVersion = process.env.LAGOON_VERSION;

const taskBlocklist =
  (process.env.LAGOON_UI_TASK_BLOCKLIST &&
    process.env.LAGOON_UI_TASK_BLOCKLIST.split(',')) ||
  [];

module.exports = {
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/projects',
      //   permanent: false,
      // },
    ]
  },
  publicRuntimeConfig: {
    GRAPHQL_API: lagoonApiRoute ? `${lagoonApiRoute}/graphql` : envApiRoute,
    GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
    KEYCLOAK_API: lagoonKeycloakRoute
      ? `${lagoonKeycloakRoute}/auth`
      : envKeycloakRoute,
    LAGOON_UI_ICON: process.env.LAGOON_UI_ICON,
    LAGOON_UI_TASK_BLOCKLIST: taskBlocklist,
    LAGOON_VERSION: lagoonVersion,
    LAGOON_UI_DEPLOYMENTS_LIMIT: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT,
    LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE,
    LAGOON_UI_TASKS_LIMIT: process.env.LAGOON_UI_TASKS_LIMIT,
    LAGOON_UI_TASKS_LIMIT_MESSAGE: process.env.LAGOON_UI_TASKS_LIMIT_MESSAGE,
    LAGOON_UI_BACKUPS_LIMIT: process.env.LAGOON_UI_BACKUPS_LIMIT,
    LAGOON_UI_BACKUPS_LIMIT_MESSAGE: process.env.LAGOON_UI_BACKUPS_LIMIT_MESSAGE,
  },
  future: {
    webpack5: true,
  },
  // experimental: {
  //   reactRoot: 'concurrent'
  // },
  webpack(config, options) {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/lib/polyfills.js')
      ) {
        entries['main.js'].unshift('./src/lib/polyfills.js');
      }

      return entries;
    };

    // Debug config.
    // console.dir(config, { depth: null });

    return config;
  }
};
