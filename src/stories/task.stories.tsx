import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';


import PageTask from '../pages/task';

const meta: Meta<typeof PageTask> = {
  title: 'Pages/Task',
  component: PageTask,
};
type Story = StoryObj<typeof PageTask>;



export const Default: Story = {
    parameters: {
      msw: {
        handlers: [
          graphql.query('getEnvironment', (_, res, ctx) => {
            return res(ctx.delay("infinite"))
          }),
        ],
      },    
    },
  };
  

export default meta;