import React, { useEffect } from 'react';

import { useState } from '@storybook/addons';
import { ThemeProvider } from 'styled-components';

import { AppContext } from '../../src/pages/_app';
import { darkTheme, lightTheme } from '../../src/styles/theme';

const withMockedAppContext = initialTheme => (Story, context) => {
  const [theme, setTheme] = useState(initialTheme);

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

  const lagoonTheme = React.useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);

  const themeTouse = context.globals?.theme ? context.globals.theme === "light" ? lightTheme  : darkTheme : lagoonTheme
  return (
    <AppContext.Provider value={mockedValues}>
      <ThemeProvider theme={themeTouse}>
        <Story />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default withMockedAppContext;
