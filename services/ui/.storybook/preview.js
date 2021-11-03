import config from './next.mock-config';
import React from 'react';
import { AuthContext } from 'lib/KeycloakProvider';
// import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11.2
import { RouterContext } from "next/dist/next-server/lib/router-context"; // next < 11.2
import { MockedProvider } from '@apollo/client/testing';
import lagoonTheme from './lagoonTheme';

import 'styles/nprogress.css';
import 'semantic-ui-css/semantic.min.css';
import 'components/Honeycomb/styling.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  layout: 'centered',
  contexts: [],
  nextRouter: {
    Provider: RouterContext.Provider,
    // defaults
    path: '/',
      asPath: '/',
      query: {}, 
  },
  options: {
    theme: lagoonTheme,
    showRoots: true,
     storySort: {
      order: ['Home', 'Pages', 'Components'],
    },
  },
  apolloClient: {
    defaultOptions: { watchQuery: { fetchPolicy: 'no-cache' }, addTypename: false },
    MockedProvider
  },
  a11y: {
    restoreScroll: true,
  },
};

const auth = {
  apiToken: null,
  authenticated: true,
  user: {
    username: "lagoon-user",
  }
}

export const decorators = [
  (Story, context) => {
    return (
      <AuthContext.Provider value={auth}>
        <div id="__next">
          <Story {...context}/>
        </div>
      </AuthContext.Provider>
    )
  },
];