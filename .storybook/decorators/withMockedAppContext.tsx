import React, { useEffect, useState } from 'react';

import { useGlobals } from '@storybook/client-api';
import { ThemeProvider } from 'styled-components';

import { AppContext } from '../../src/pages/_app';
import { darkTheme, lightTheme } from '../../src/styles/theme';

const withMockedAppContext = initialTheme => (Story, context) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const [globals, setGlobals] = useGlobals();

  const isDocsPage = context.viewMode === 'docs';

  useEffect(() => {
    if (!isDocsPage) {
      const newBg = context.globals.theme === 'dark' ? '#333333' : '#F8F8F8';

      setGlobals({
        ...globals,
        backgrounds: {
          value: newBg,
        },
      });
    }
  }, [globals.theme]);

  const getTheme = () => {
    if (context.globals?.theme === 'light') {
      return lightTheme;
    }
    if (context.globals?.theme === 'dark') {
      return darkTheme;
    }
    return theme === 'light' ? lightTheme : darkTheme;
  };

  const themeToUse = getTheme();

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeToUse}>
        <Story />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default withMockedAppContext;
