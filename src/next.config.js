const webpackShared = require('./webpack.shared-config');
require('dotenv-extended').load();
const fs = require('fs');

const taskBlocklist = (process.env.LAGOON_UI_TASK_BLOCKLIST && process.env.LAGOON_UI_TASK_BLOCKLIST.split(',')) || [];

// Here we load the plugin registry from plugins.json
let pluginRegistry = {};
if (fs.existsSync('plugins.json')) {
  const pluginString = fs.readFileSync('plugins.json');
  pluginRegistry = JSON.parse(pluginString);
}

module.exports = {
  publicRuntimeConfig: {
    GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
    GRAPHQL_API: process.env.GRAPHQL_API,
    KEYCLOAK_API: process.env.KEYCLOAK_API,
    LAGOON_UI_ICON: process.env.LAGOON_UI_ICON,
    LAGOON_UI_TASK_BLOCKLIST: taskBlocklist,
    LAGOON_VERSION: process.env.LAGOON_VERSION,
    LAGOON_UI_DEPLOYMENTS_LIMIT: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT,
    LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE,
    LAGOON_UI_TASKS_LIMIT: process.env.LAGOON_UI_TASKS_LIMIT,
    LAGOON_UI_TASKS_LIMIT_MESSAGE: process.env.LAGOON_UI_TASKS_LIMIT_MESSAGE,
    LAGOON_UI_BACKUPS_LIMIT: process.env.LAGOON_UI_BACKUPS_LIMIT,
    LAGOON_UI_BACKUPS_LIMIT_MESSAGE: process.env.LAGOON_UI_BACKUPS_LIMIT_MESSAGE,
    LAGOON_UI_YOUR_ACCOUNT_DISABLED: process.env.LAGOON_UI_YOUR_ACCOUNT_DISABLED,
    LAGOON_UI_TOURS_ENABLED: process.env.LAGOON_UI_TOURS_ENABLED,
    LAGOON_UI_STATUS_TIMEOUT:process.env.LAGOON_UI_STATUS_TIMEOUT,
    PLUGIN_SCRIPTS: pluginRegistry,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
  },
  distDir: '../build',
  webpack(config, options) {
    // Add aliases from shared config file.
    if (webpackShared && webpackShared.alias) {
      Object.keys(webpackShared.alias).forEach(name => (config.resolve.alias[name] = webpackShared.alias[name]));
    }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./lib/polyfills.js')) {
        entries['main.js'].unshift('./lib/polyfills.js');
      }

      return entries;
    };

    // Debug config.
    // console.dir(config, { depth: null });

    return config;
  },
};
