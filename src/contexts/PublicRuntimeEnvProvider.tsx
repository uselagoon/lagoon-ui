import { ReactNode } from 'react';

import { EnvProvider } from 'next-runtime-env';

import fs from 'node:fs';

export default function PublicRuntimeEnvProvider({ children }: { children: ReactNode }) {
  let pluginRegistry = {};
  if (fs.existsSync('plugins.json')) {
    const pluginString = fs.readFileSync('plugins.json', 'utf-8');
    pluginRegistry = JSON.parse(pluginString);
  }
  const taskBlocklist = (process.env.LAGOON_UI_TASK_BLOCKLIST && process.env.LAGOON_UI_TASK_BLOCKLIST.split(',')) || [];

  return (
    <EnvProvider
      env={{
        GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
        GRAPHQL_API: process.env.GRAPHQL_API,
        LAGOON_UI_ICON: process.env.LAGOON_UI_ICON,
        // accessible by useEnvContext(), will need to be parsed
        LAGOON_UI_TASK_BLOCKLIST: JSON.stringify(taskBlocklist),
        LAGOON_VERSION: process.env.LAGOON_VERSION,
        LAGOON_UI_DEPLOYMENTS_LIMIT: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT,
        LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE,
        LAGOON_UI_TASKS_LIMIT: process.env.LAGOON_UI_TASKS_LIMIT,
        LAGOON_UI_TASKS_LIMIT_MESSAGE: process.env.LAGOON_UI_TASKS_LIMIT_MESSAGE,
        LAGOON_UI_BACKUPS_LIMIT: process.env.LAGOON_UI_BACKUPS_LIMIT,
        LAGOON_UI_BACKUPS_LIMIT_MESSAGE: process.env.LAGOON_UI_BACKUPS_LIMIT_MESSAGE,
        LAGOON_UI_YOUR_ACCOUNT_DISABLED: process.env.LAGOON_UI_YOUR_ACCOUNT_DISABLED,
        LAGOON_UI_VIEW_ENV_VARIABLES: process.env.LAGOON_UI_VIEW_ENV_VARIABLES,
        LAGOON_UI_TOURS_ENABLED: process.env.LAGOON_UI_TOURS_ENABLED,
        LAGOON_UI_STATUS_TIMEOUT: process.env.LAGOON_UI_STATUS_TIMEOUT,
        // accessible by useEnvContext(), will need to be parsed
        PLUGIN_SCRIPTS: JSON.stringify(pluginRegistry),
        WEBHOOK_URL: process.env.WEBHOOK_URL,
        DISABLE_SUBSCRIPTIONS: process.env.DISABLE_SUBSCRIPTIONS,
      }}
    >
      {children}
    </EnvProvider>
  );
}
