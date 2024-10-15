import { defineConfig } from 'cypress';

export default defineConfig({
  requestTimeout: 15000,
  defaultCommandTimeout: 8000,
  e2e: {
    env: {
      api: 'http://0.0.0.0:33000/graphql',
      keycloak: 'http://0.0.0.0:38088/auth',
      url: 'http://0.0.0.0:3000',
      user_guest: 'guest@example.com',
      user_reporter: 'reporter@example.com',
      user_developer: 'developer@example.com',
      user_maintainer: 'maintainer@example.com',
      user_owner: 'owner@example.com',
      // orgs
      user_orguser: 'orguser@example.com',
      user_orgviewer: 'orgviewer@example.com',
      user_orgadmin: 'orgadmin@example.com',
      user_orgowner: 'orgowner@example.com',
      // top level user for all default tests
      user_platformowner: 'platformowner@example.com',
    },
  },
});
