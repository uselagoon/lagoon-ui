import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';


import PageProblems from '../pages/problems';

const meta: Meta<typeof PageProblems> = {
  title: 'Pages/ProblemsPage',
  component: PageProblems,
};
type Story = StoryObj<typeof PageProblems>;



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