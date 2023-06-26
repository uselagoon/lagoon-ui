import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import RemoveNotificationConfirm from 'components/Organizations/RemoveNotificationConfirm';
import gql from 'graphql-tag';

import { StyledOrgNotifications } from './Styles';

const REMOVE_NOTIFICATION_SLACK = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationSlack(input: { name: $name })
  }
`;

const REMOVE_NOTIFICATION_ROCKETCHAT = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationRocketChat(input: { name: $name })
  }
`;

const REMOVE_NOTIFICATION_EMAIL = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationEmail(input: { name: $name })
  }
`;

const REMOVE_NOTIFICATION_TEAMS = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationMicrosoftTeams(input: { name: $name })
  }
`;

const REMOVE_NOTIFICATION_WEBHOOK = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationWebhook(input: { name: $name })
  }
`;

/**
 * The primary list of projects.
 */
const OrgNotifications = ({ slacks = [], rocketchats = [], emails = [], teams = [], webhooks = [], refresh }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredSlackNotifications = slacks.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    const sortByChannel = key.channel.toLowerCase().includes(searchInput.toLowerCase());
    const sortByWebhook = key.webhook.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename', 'webhook', 'channel'].includes(key)
      ? false
      : (true && sortByName) || (true && sortByChannel) || (true && sortByWebhook);
  });

  const filteredRocketChatNotifications = rocketchats.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    const sortByChannel = key.channel.toLowerCase().includes(searchInput.toLowerCase());
    const sortByWebhook = key.webhook.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename', 'webhook', 'channel'].includes(key)
      ? false
      : (true && sortByName) || (true && sortByChannel) || (true && sortByWebhook);
  });

  const filteredTeamsNotifications = teams.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    const sortByWebhook = key.webhook.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename', 'webhook'].includes(key) ? false : (true && sortByName) || (true && sortByWebhook);
  });

  const filteredWebhookNotifications = webhooks.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    const sortByWebhook = key.webhook.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename', 'webhook'].includes(key) ? false : (true && sortByName) || (true && sortByWebhook);
  });

  const filteredEmailNotifications = emails.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    const sortByEmail = key.emailAddress.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename', 'emailAddress'].includes(key) ? false : (true && sortByName) || (true && sortByEmail);
  });

  return (
    <StyledOrgNotifications>
      <div className="header">
        <label>Notifications</label>
        <label></label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={slacks.length === 0}
        />
      </div>

      <div className="data-table">
        {!slacks.length && !rocketchats.length && !emails.length && !teams.length && !webhooks.length && (
          <div className="data-none">No notifications</div>
        )}
        {searchInput &&
          !filteredSlackNotifications.length &&
          !filteredEmailNotifications.length &&
          !filteredRocketChatNotifications.length &&
          !filteredTeamsNotifications.length &&
          !filteredWebhookNotifications.length && (
            <div className="data-none">No notifications matching "{searchInput}"</div>
          )}
        {filteredSlackNotifications.map(project => (
          <div className="data-row" project={project.name} key={project.name}>
            <div className="name">{project.name}</div>
            <div className="notiftype">
              <label className="slack-group-label">SLACK</label>
            </div>
            <div className="notifdata">
              Webhook: {project.webhook}
              <br></br>
              Channel: {project.channel}
            </div>
            <div className="remove">
              <Mutation mutation={REMOVE_NOTIFICATION_SLACK}>
                {(removeNotification, { loading, called, error, data }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data) {
                    refresh();
                  }
                  return (
                    <RemoveNotificationConfirm
                      removeName={project.name}
                      onRemove={() =>
                        removeNotification({
                          variables: {
                            name: project.name,
                          },
                        })
                      }
                    />
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
        {filteredRocketChatNotifications.map(project => (
          <div className="data-row" project={project.name} key={project.name}>
            <div className="name">{project.name}</div>
            <div className="notiftype">
              <label className="rocketchat-group-label">ROCKETCHAT</label>
            </div>
            <div className="notifdata">
              Webhook: {project.webhook}
              <br></br>
              Channel: {project.channel}
            </div>
            <div className="remove">
              <Mutation mutation={REMOVE_NOTIFICATION_ROCKETCHAT}>
                {(removeNotification, { loading, called, error, data }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data) {
                    refresh();
                  }
                  return (
                    <RemoveNotificationConfirm
                      removeName={project.name}
                      onRemove={() =>
                        removeNotification({
                          variables: {
                            name: project.name,
                          },
                        })
                      }
                    />
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
        {filteredEmailNotifications.map(project => (
          <div className="data-row" project={project.name} key={project.name}>
            <div className="name">{project.name}</div>
            <div className="notiftype">
              <label className="email-group-label">EMAIL</label>
            </div>
            <div className="notifdata">Address: {project.emailAddress}</div>
            <div className="remove">
              <Mutation mutation={REMOVE_NOTIFICATION_EMAIL}>
                {(removeNotification, { loading, called, error, data }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data) {
                    refresh();
                  }
                  return (
                    <RemoveNotificationConfirm
                      removeName={project.name}
                      onRemove={() =>
                        removeNotification({
                          variables: {
                            name: project.name,
                          },
                        })
                      }
                    />
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
        {filteredWebhookNotifications.map(project => (
          <div className="data-row" project={project.name} key={project.name}>
            <div className="name">{project.name}</div>
            <div className="notiftype">
              <label className="webhook-group-label">WEBHOOK</label>
            </div>
            <div className="notifdata">Webhook: {project.webhook}</div>
            <div className="remove">
              <Mutation mutation={REMOVE_NOTIFICATION_WEBHOOK}>
                {(removeNotification, { loading, called, error, data }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data) {
                    refresh();
                  }
                  return (
                    <RemoveNotificationConfirm
                      removeName={project.name}
                      onRemove={() =>
                        removeNotification({
                          variables: {
                            name: project.name,
                          },
                        })
                      }
                    />
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
        {filteredTeamsNotifications.map(project => (
          <div className="data-row" project={project.name} key={project.name}>
            <div className="name">{project.name}</div>
            <div className="notiftype">
              <label className="microsoftteams-group-label">TEAMS</label>
            </div>
            <div className="notifdata">Webhook: {project.webhook}</div>
            <div className="remove">
              <Mutation mutation={REMOVE_NOTIFICATION_TEAMS}>
                {(removeNotification, { loading, called, error, data }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data) {
                    refresh();
                  }
                  return (
                    <RemoveNotificationConfirm
                      removeName={project.name}
                      onRemove={() =>
                        removeNotification({
                          variables: {
                            name: project.name,
                          },
                        })
                      }
                    />
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
      </div>
    </StyledOrgNotifications>
  );
};

export default OrgNotifications;
