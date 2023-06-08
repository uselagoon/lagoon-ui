// @ts-nocheck 
import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';


import PageTasks from '../pages/tasks';

const meta: Meta<typeof PageTasks> = {
  title: 'Pages/Tasks',
  component: PageTasks,
};
type Story = StoryObj<typeof PageTasks>;



export const Default: Story = {
    parameters: {
      msw: {
        handlers: [
          graphql.operation( (_, res, ctx) => {
            return res(ctx.delay("infinite"))
          }),
        ],
      },
    },
  };
  

export default meta;