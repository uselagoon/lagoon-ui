import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import PageNotifications from '../../pages/organizations/notifications';

faker.seed(123);

const fakeQueryParams = {
  organizationName: 'Test Org',
};

const meta: Meta<typeof PageNotifications> = {
  title: 'Pages/Organizations/Notifications',
  component: PageNotifications,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};

type Story = StoryObj<typeof PageNotifications>;

const mockOrganization = getOrganization();

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getNotifications', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ organization: mockOrganization }));
        }),

        graphql.mutation('addNotificationSlack', (req, res, ctx) => {
          const { name, channel, webhook } = req.variables;

          mockOrganization.slacks = [
            {
              name,
              webhook,
              channel,
              __typename: 'NotificationSlack',
            },
            ...mockOrganization.slacks,
          ];

          return res(ctx.delay(), ctx.data({ addNotificationSlack: {} }));
        }),

        graphql.mutation('addNotificationRocketChat', (req, res, ctx) => {
          const { name, channel, webhook } = req.variables;

          mockOrganization.rocketchats = [
            {
              name,
              webhook,
              channel,
              __typename: 'NotificationRocketChat',
            },
            ...mockOrganization.rocketchats,
          ];

          return res(ctx.delay(), ctx.data({ addNotificationRocketChat: {} }));
        }),

        graphql.mutation('addNotificationEmail', (req, res, ctx) => {
          const { name, emailAddress } = req.variables;

          mockOrganization.emails = [
            {
              name,
              emailAddress,
              __typename: 'NotificationEmail',
            },
            ...mockOrganization.emails,
          ];

          return res(ctx.delay(), ctx.data({ addNotificationEmail: {} }));
        }),

        graphql.mutation('addNotificationMicrosoftTeams', (req, res, ctx) => {
          const { name, webhook } = req.variables;

          mockOrganization.teams = [
            {
              name,
              webhook,
              channel: '',
              __typename: 'NotificationMicrosoftTeams',
            },
            ...mockOrganization.teams,
          ];

          return res(ctx.delay(), ctx.data({ addNotificationMicrosoftTeams: {} }));
        }),

        graphql.mutation('addNotificationWebhook', (req, res, ctx) => {
          const { name, webhook } = req.variables;

          mockOrganization.webhook = [
            {
              name,
              webhook,
              channel: '',
              __typename: 'NotificationWebhook',
            },
            ...mockOrganization.webhook,
          ];

          return res(ctx.delay(), ctx.data({ addNotificationRocketChat: {} }));
        }),

        graphql.mutation('removeNotification', (req, res, ctx) => {
          const { name } = req.variables;
          const { slacks, rocketchats, teams, webhook, emails } = mockOrganization;

          const allNotifications = [slacks, rocketchats, teams, webhook, emails].flat();

          const found = allNotifications.find(notification => {
            return notification.name === name;
          });

          const modifyByType = (type: string) => {
            switch (type) {
              case 'NotificationSlack':
                mockOrganization.slacks = mockOrganization.slacks.filter(s => s.name !== name);
                break;
              case 'NotificationRocketChat':
                mockOrganization.rocketchats = mockOrganization.rocketchats.filter(s => s.name !== name);
                break;
              case 'NotificationMicrosoftTeams':
                mockOrganization.teams = mockOrganization.teams.filter(s => s.name !== name);
                break;
              case 'NotificationWebhook':
                mockOrganization.webhook = mockOrganization.webhook.filter(s => s.name !== name);
                break;
              case 'NotificationEmail':
                mockOrganization.emails = mockOrganization.emails.filter(s => s.name !== name);
            }
          };

          if (found) {
            modifyByType(found.__typename);
            return res(ctx.delay(), ctx.data({ removeNotification: found }));
          }

          return res(ctx.status(400));
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

export default meta;
