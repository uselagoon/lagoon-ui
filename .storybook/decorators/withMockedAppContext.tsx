import React, { useEffect } from 'react';

import { useState } from '@storybook/addons';
import { ThemeProvider } from 'styled-components';

import { AppContext } from '../../src/pages/_app';
import { darkTheme, lightTheme } from '../../src/styles/theme';

const withMockedAppContext = initialTheme => (Story, context) => {
  const [theme, setTheme] = useState(initialTheme);
  const [initialBg] = useState(context.globals.theme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const mockedValues = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  useEffect(() => {
    /* Yucky HACKY way of making backgrounds addon dynamically work with theme switching
      causes a page reload on theme change and matches the theme to storybook bg
    */
    const theme = context.globals.theme;
    if (theme !== initialBg) {

      if (theme) {
        const params = new URLSearchParams(window.parent.location.search);
        const globalParams = params.get('globals');
        const regex = /backgrounds\.value:!hex\(\w{6}\)/;

        if (globalParams) {
          const exists = regex.test(globalParams);
          if (!exists) return;

          const newBgColor = theme === 'dark' ? '333333' : 'F8F8F8';
          const updated = globalParams.replace(regex, `backgrounds.value:!hex(${newBgColor})`);
          params.set('globals', updated);

          //disable iurl encoding
          const decodedString = params
            .toString()
            .replace(/%2F/g, '/')
            .replace(/%28/g, '(')
            .replace(/%29/g, ')')
            .replace(/%2E/g, '.')
            .replace(/%21/g, '!')
            .replace(/%3A/g, ':')
            .replace(/%3B/g, ';')
            .replace(/%2C/g, '&');
          // update the search bar
          const newUrl = `${window.parent.location.origin}?${decodedString}`;

          window.parent.location.replace(newUrl);
        }
      }
    }
  }, [context.globals.theme]);
  const lagoonTheme = React.useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);

  const themeTouse = context.globals?.theme
    ? context.globals.theme === 'light'
      ? lightTheme
      : darkTheme
    : lagoonTheme;
  return (
    <AppContext.Provider value={mockedValues}>
      <ThemeProvider theme={themeTouse}>
        <Story />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default withMockedAppContext;
