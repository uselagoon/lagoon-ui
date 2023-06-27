import { Meta, StoryObj } from '@storybook/react';

import ResultsLimited from './index';

/**
 * Results limited ( a select element for filtering )
 */
const meta: Meta<typeof ResultsLimited> = {
  title: 'Components/ResultsLimited',
  component: ResultsLimited,
  tags: ['autodocs'],
  args: {
    disableHandler: true,
  },
  argTypes: {
    limit: {
      description: 'Sets result limit to the URL',
      control: {
        type: 'select',
      },
      options: [10, 25, 50, 100, 'all'],
    },
  },
};

export const Default: StoryObj<typeof ResultsLimited> = {};

export const WithLimit: StoryObj<typeof ResultsLimited> = {
  args: {
    limit: 100,
  },
};

export default meta;
