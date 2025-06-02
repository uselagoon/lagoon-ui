import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

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

type ResponseType = {
  organization: typeof mockOrganization;
};

type AddMutationResponseType<T extends string> = {
  [K in T]: {};
};

type RemoveMutationResponseType = {
  removeNotification: any;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getNotifications', () => {
          delay();

          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              organization: mockOrganization,
            },
          });
        }),

        graphql.mutation('addNotificationSlack', ({ variables }) => {
          const { name, channel, webhook } = variables;

          mockOrganization.slacks = [
            {
              name,
              webhook,
              channel,
              __typename: 'NotificationSlack',
            },
            ...mockOrganization.slacks,
          ];

          delay();

          return HttpResponse.json<{ data: AddMutationResponseType<'addNotificationSlack'> }>({
            data: {
              addNotificationSlack: {},
            },
          });
        }),

        graphql.mutation('addNotificationRocketChat', ({ variables }) => {
          const { name, channel, webhook } = variables;

          mockOrganization.rocketchats = [
            {
              name,
              webhook,
              channel,
              __typename: 'NotificationRocketChat',
            },
            ...mockOrganization.rocketchats,
          ];

          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'addNotificationRocketChat'> }>({
            data: {
              addNotificationRocketChat: {},
            },
          });
        }),

        graphql.mutation('addNotificationEmail', ({ variables }) => {
          const { name, emailAddress } = variables;

          mockOrganization.emails = [
            {
              name,
              emailAddress,
              __typename: 'NotificationEmail',
            },
            ...mockOrganization.emails,
          ];

          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'addNotificationEmail'> }>({
            data: {
              addNotificationEmail: {},
            },
          });
        }),

        graphql.mutation('addNotificationMicrosoftTeams', ({ variables }) => {
          const { name, webhook } = variables;

          mockOrganization.teams = [
            {
              name,
              webhook,
              channel: '',
              __typename: 'NotificationMicrosoftTeams',
            },
            ...mockOrganization.teams,
          ];

          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'addNotificationMicrosoftTeams'> }>({
            data: {
              addNotificationMicrosoftTeams: {},
            },
          });
        }),

        graphql.mutation('addNotificationWebhook', ({ variables }) => {
          const { name, webhook } = variables;

          mockOrganization.webhook = [
            {
              name,
              webhook,
              channel: '',
              __typename: 'NotificationWebhook',
            },
            ...mockOrganization.webhook,
          ];
          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'addNotificationRocketChat'> }>({
            data: {
              addNotificationRocketChat: {},
            },
          });
        }),

        graphql.mutation('removeNotification', ({ variables }) => {
          const { name } = variables;
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

            return HttpResponse.json<{ data: RemoveMutationResponseType }>({
              data: {
                removeNotification: found,
              },
            });
          }

          return new HttpResponse('', { status: 400 });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          return delay('infinite');
        }),
      ],
    },
  },
};

export default meta;
