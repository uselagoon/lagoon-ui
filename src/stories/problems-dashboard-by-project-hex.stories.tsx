import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';


import ProblemsDashboardProductPageHexDisplay from '../pages/problems-dashboard-by-project-hex';

const meta: Meta<typeof ProblemsDashboardProductPageHexDisplay> = {
  title: 'Pages/Problems by hex',
  component: ProblemsDashboardProductPageHexDisplay,
};
type Story = StoryObj<typeof ProblemsDashboardProductPageHexDisplay>;



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