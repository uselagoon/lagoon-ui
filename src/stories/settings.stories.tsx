import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { MockSettings } from '../../.storybook/mocks/api';
import SettingsPage from '../pages/settings/';

const meta: Meta<typeof SettingsPage> = {
  title: 'Pages/Settings',
  component: SettingsPage,
};
type Story = StoryObj<typeof SettingsPage>;

const settingsResponse = MockSettings(123);

type ResponseType = {
  me: typeof settingsResponse;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('me', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              me: settingsResponse,
            },
          });
        }),
      ],
    },
  },
};

export default meta;
