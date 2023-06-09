import React from 'react';

import { GlobalStyles } from '../../src/layouts/GlobalStyles';

const withGlobalStyles = Story => {
  return (
    <>
      <GlobalStyles />
      <Story />
    </>
  );
};

export default withGlobalStyles;
