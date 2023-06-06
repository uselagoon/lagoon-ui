import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import type { Preview } from '@storybook/react';
// mock worker
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';

// theming/styled-components
import { GlobalStyles } from '../src/layouts/GlobalStyles';
import { darkTheme, lightTheme } from '../src/styles/theme';
// apollo/auth and theme context mocks
import withMockAuth from './decorators/apiConnection';
import withLoadingSkeletons from './decorators/withLoadingSkeletons';
import withMockedAppContextProvider from './decorators/withMockedAppContext';
import withTourProvider from './decorators/withTourProvider';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  parameters: {
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
  },

  // order matters
  decorators: [

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
