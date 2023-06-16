import React, { useEffect, useState } from 'react';

import { useGlobals } from '@storybook/client-api';

import { AppContext } from '../../src/pages/_app';

const withMockedAppContext = initialTheme => (Story, context) => {
  const [theme, setTheme] = useState(initialTheme);
  const [globals, setGlobals] = useGlobals();
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const isDocsPage = context.viewMode === 'docs';

  useEffect(() => {
    if (!isDocsPage) {
      const initialTheme = (context.globals.theme === '' || context.globals.theme ==="dark") ? 'dark' : "light";
      const newBg = initialTheme === 'dark' ? '#333333' : '#F8F8F8';

      setGlobals({
        ...globals,
        backgrounds: {
          value: newBg,
        },
      });
    }
  }, [globals.theme]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      <Story {...context} />
    </AppContext.Provider>
  );
};

export default withMockedAppContext;
