import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';


import ProblemsDashboardProductPage from '../pages/problems-dashboard-by-project';

const meta: Meta<typeof ProblemsDashboardProductPage> = {
  title: 'Pages/Problems by project',
  component: ProblemsDashboardProductPage,
};
type Story = StoryObj<typeof ProblemsDashboardProductPage>;



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