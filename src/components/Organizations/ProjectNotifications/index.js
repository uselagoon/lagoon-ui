import React, { useState } from 'react';

import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Tooltip } from 'antd';
import RemoveProjectGroupConfirm from 'components/Organizations/RemoveProjectGroupConfirm';
import OrgNotificationsLink from 'components/link/Organizations/Notifications';
import gql from 'graphql-tag';

import AddNotificationToProject from '../AddNotificationToProject';
import { SearchBar } from '../Orgheader/Styles';
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
const ProjectNotifications = ({
  notifications = [],
  organizationSlug,
  organizationId,
  projectName,
  organization,
  refresh,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [removeNotificationFromProject, { loading, error }] = useMutation(REMOVE_NOTIFICATION_FROM_PROJECT, {
    onCompleted: () => {
      refresh();
    },
    onError: e => {
      console.error(e);
    },
  });

  const filteredMembers = notifications.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', '__typename'].includes(key) ? false : true && sortByName;
  });

  return (
    <StyledProjectNotifications>
      <div className="tableheader">
        <label>Notifications ({notifications.length})</label>

        <SearchBar className="search">
          <SearchOutlined className="icon" />
          <input
            aria-labelledby="search"
            className="searchBar"
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Type to search"
            disabled={notifications.length === 0}
          />
        </SearchBar>
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
              {error ? (
                <div>{error.message}</div>
              ) : (
                <TableActions>
                  <Tooltip overlayClassName="orgTooltip" title="Edit" placement="bottom">
                    <>
                      <OrgNotificationsLink organizationSlug={organizationSlug} className="link">
                        <EditOutlined className="edit" />
                      </OrgNotificationsLink>
                    </>
                  </Tooltip>
                  <RemoveProjectGroupConfirm
                    loading={loading}
                    info={{ type: 'notification', projectName: projectName, deleteName: notification.name }}
                    onRemove={() =>
                      removeNotificationFromProject({
                        variables: {
                          projectName: projectName,
                          notificationType: notification.type,
                          notificationName: notification.name,
                        },
                      })
                    }
                  />
                </TableActions>
              )}
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
