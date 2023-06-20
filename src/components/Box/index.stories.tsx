import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Box from './index';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
};

export const Default: StoryObj<typeof Box> = {
  render: args => {
    return (
      <Box {...args}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio magni et quae placeat. Assumenda excepturi earum
          recusandae corporis voluptatem sint?
        </div>
      </Box>
    );
  },
};

export default meta;
