import React from 'react';

import { DocsContainer } from '@storybook/blocks';
import { GLOBALS_UPDATED, FORCE_REMOUNT, FORCE_RE_RENDER, UPDATE_GLOBALS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';
// mock worker
import { initialize, mswDecorator } from 'msw-storybook-addon';

// apollo/auth and theme context mocks
import withMockAuth from './decorators/ApiConnection';
import withGlobalStyles from './decorators/withGlobalStyles';
import withLoadingSkeletons from './decorators/withLoadingSkeletons';
import withMockedAppContextProvider from './decorators/withMockedAppContext';
import withTourProvider from './decorators/withTourProvider';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introduction', 'Components', 'Pages', '*'],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
    },
    docs: {
      // container: props => {
      //   const channel = addons.getChannel();
      //   let eventProcessed = false;

      //   function updateBg(e) {
      //     if (!eventProcessed) {
      //       channel.removeListener(GLOBALS_UPDATED, updateBg);
      //       const changedTheme = e.globals.theme;

      //       channel.emit(UPDATE_GLOBALS, {
      //         globals: {
      //           backgrounds: {
      //             value: changedTheme === 'dark' ? '#333333' : '#F8F8F8',
      //           },
      //         },
      //       });
      //       channel.emit(FORCE_RE_RENDER);

      //       eventProcessed = true;
      //     }
      //   }

      //   channel.once(GLOBALS_UPDATED, updateBg);

      //   return React.createElement(DocsContainer, props);
      // },
    },
  },

  // order matters
  decorators: [
    withTourProvider,
    withLoadingSkeletons,
    withGlobalStyles,
    withMockedAppContextProvider('dark'),
    withMockAuth,
    mswDecorator,

  ],
};
export const globalTypes = {
  theme: {
    name: 'Color scheme',
    description: 'Light or dark mode',
    defaultValue: 'dark',
    toolbar: {
      icon: 'mirror',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};
export default preview;
