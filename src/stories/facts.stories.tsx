import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { generateEnvironments, generateFact } from '../../.storybook/mocks/mocks';
import PageFacts from '../pages/facts';

const meta: Meta<typeof PageFacts> = {
  title: 'Pages/Facts',
  component: PageFacts,
};
type Story = StoryObj<typeof PageFacts>;

const environment = generateEnvironments(123);
environment.facts = [generateFact(1), generateFact(2), generateFact(3), generateFact(123)] as any;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment,
            })
          );
        }),
      ],
    },
  },
};

export const NoFacts: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment:{...environment, facts:[]},
            })
          );
        }),
      ],
    },
  },
};


export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.delay('infinite'));
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.status(403));
        }),
      ],
    },
  },
  render: () => {
    return <QueryError error="Error" />;
  },
};
export default meta;
