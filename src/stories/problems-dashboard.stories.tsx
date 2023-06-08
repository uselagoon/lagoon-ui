import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';


import ProblemsDashboardPage from '../pages/problems-dashboard';

const meta: Meta<typeof ProblemsDashboardPage> = {
  title: 'Pages/Problems Dashboard',
  component: ProblemsDashboardPage,
};
type Story = StoryObj<typeof ProblemsDashboardPage>;



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