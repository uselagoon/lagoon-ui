import React from 'react';

import Lipsum from 'storybook/components/Lipsum';

import Box from './index';

export default {
  component: Box,
  title: 'Components/Box',
};

export const Default = () => (
  <Box>
    <Lipsum />
  </Box>
);
