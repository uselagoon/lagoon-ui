import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { EditOutlined } from '@ant-design/icons';
import RemoveProjectGroupConfirm from 'components/Organizations/RemoveProjectGroupConfirm';
import gql from 'graphql-tag';
import OrgNotificationsLink from 'components/link/Organizations/Notifications';
import AddNotificationToProject from '../AddNotificationToProject';
import { TableActions } from '../SharedStyles';
import { StyledProjectNotifications } from './Styles';

const REMOVE_NOTIFICATION_FROM_PROJECT = gql`
  mutation removeNotificationFromProject(
    $notificationType: NotificationType!
    $notificationName: String!
    $projectName: String!
  ) {
    removeNotificationFromProject(
      input: { notificationType: $notificationType, notificationName: $notificationName, project: $projectName }
    ) {
      name
    }
  }
`;

/**
 * The primary list of members.
 */
const ProjectNotifications = ({ notifications = [], organizationId, projectName, organization, refresh }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredMembers = notifications.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename'].includes(key) ? false : true && sortByName;
  });

  return (
    <StyledProjectNotifications>
      <div className="header" style={{ marginTop: '20px', paddingRight: '0' }}>
        <label style={{ paddingLeft: '0' }}>Notifications ({notifications.length})</label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={notifications.length === 0}
        />
      </div>

      <div className="data-table">
        {!notifications.length && <div className="data-none">No notifications</div>}
        {searchInput && !filteredMembers.length && (
          <div className="data-none">No notifications matching "{searchInput}"</div>
        )}
        {filteredMembers.map(notification => (
          <div className="data-row" key={`${notification.name}-${notification.type}`}>
            <div className="name">{notification.name}</div>
            <div className="name">
              <label className={notification.type.toLowerCase() + '-group-label'}>{notification.type}</label>
            </div>
            <div className="remove">
              <Mutation mutation={REMOVE_NOTIFICATION_FROM_PROJECT}>
                {(removeNotificationFromProject, { _, called, error }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  return (
                    <TableActions>
                      <OrgNotificationsLink organizationSlug={organizationId} className="link">
                        <EditOutlined className="edit" />
                      </OrgNotificationsLink>
                      <RemoveProjectGroupConfirm
                        loading={called}
                        info={{ type: 'notification', projectName: projectName, deleteName: notification.name }}
                        onRemove={() => {
                          removeNotificationFromProject({
                            variables: {
                              projectName: projectName,
                              notificationType: notification.type,
                              notificationName: notification.name,
                            },
                          }).then(refresh);
                        }}
                      />
                    </TableActions>
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
      </div>

      <AddNotificationToProject
        projectName={projectName}
        organizationId={organizationId}
        options={organization}
        refresh={refresh}
      />
    </StyledProjectNotifications>
  );
};

export default ProjectNotifications;
