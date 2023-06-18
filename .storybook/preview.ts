import React from 'react';

//styles and themes
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
//autodoc configuration
import { DocsContainer } from '@storybook/blocks';
import { FORCE_RE_RENDER, GLOBALS_UPDATED, UPDATE_GLOBALS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';
// mock worker
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../src/styles/theme';
// apollo/auth/app level contexts
import withMockAuth from './decorators/ApiConnection';
import withButtonOverrides from './decorators/withButtonOverrides';
import withLoadingSkeletons from './decorators/withLoadingSkeletons';
import withMockedAppContextProvider from './decorators/withMockedAppContext';
import withTourProvider from './decorators/withTourProvider';
import GlobalStyles from './styles/GlobalStyles';
import './styles/globalStyles.scss';

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
      container: props => {
        const channel = addons.getChannel();
        let eventProcessed = false;

        function updateBg(e) {
          if (!eventProcessed) {
            eventProcessed = true;
            channel.removeListener(GLOBALS_UPDATED, updateBg);
            const changedTheme = e.globals.theme;

            channel.emit(UPDATE_GLOBALS, {
              globals: {
                backgrounds: {
                  value: changedTheme === 'dark' ? '#333333' : '#F8F8F8',
                },
              },
            });
            channel.emit(FORCE_RE_RENDER);
          }
        }

        channel.once(GLOBALS_UPDATED, updateBg);

        return React.createElement(DocsContainer, props);
      },
    },
  },

  // order matters
  decorators: [
    withButtonOverrides('.themeToggler', 'click', 'Theme toggled'),
    withTourProvider,
    withLoadingSkeletons,
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'dark',
      Provider: ThemeProvider,
      GlobalStyles,
    }),
    withMockedAppContextProvider('dark'),
    withMockAuth,
    mswDecorator,
  ],
};
export default preview;
