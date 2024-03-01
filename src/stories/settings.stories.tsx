import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { MockSettings } from '../../.storybook/mocks/api';
import SettingsPage from '../pages/settings/';

const meta: Meta<typeof SettingsPage> = {
  title: 'Pages/Settings',
  component: SettingsPage,
};
type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('me', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ allProjects: MockSettings(123) }));
        }),
      ],
    },
  },
};

export default meta;
