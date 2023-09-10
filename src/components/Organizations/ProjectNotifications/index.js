import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { EditOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveProjectGroupConfirm from 'components/Organizations/RemoveProjectGroupConfirm';
import gql from 'graphql-tag';

import AddNotificationToProject from '../AddNotificationToProject';
import {
  UPDATE_NOTIFICATION_EMAIL,
  UPDATE_NOTIFICATION_ROCKETCHAT,
  UPDATE_NOTIFICATION_SLACK,
  UPDATE_NOTIFICATION_TEAMS,
  UPDATE_NOTIFICATION_WEBHOOK,
} from '../Notifications';
import { Footer, ModalChildren, TableActions } from '../SharedStyles';
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

  const [notificationName, setNotificationName] = useState('');
  const [email, setEmail] = useState('');
  const [webhook, setWebhook] = useState('');
  const [channel, setChannel] = useState('');

  const [updateSlack] = useMutation(UPDATE_NOTIFICATION_SLACK);
  const [updateRocketChat] = useMutation(UPDATE_NOTIFICATION_ROCKETCHAT);
  const [updateEmail] = useMutation(UPDATE_NOTIFICATION_EMAIL);
  const [updateWebhook] = useMutation(UPDATE_NOTIFICATION_WEBHOOK);
  const [updateTeams] = useMutation(UPDATE_NOTIFICATION_TEAMS);

  const [editModalState, setEditModalState] = useState({
    open: false,
    current: {
      name: '',
      type: '',
    },
  });

  const closeModal = () => {
    setEditModalState({ open: false, current: { name: '', type: '' } });
    resetState();
  };

  const resetState = () => {
    setNotificationName('');
    setEmail('');
    setWebhook('');
    setChannel('');
  };

  const getAction = () => {
    switch (editModalState?.current?.type) {
      case 'SLACK':
        return () =>
          updateSlack({
            variables: {
              name: editModalState?.current?.name,
              patch: {
                ...(notificationName ? { name: notificationName } : {}),
                ...(channel ? { channel } : {}),
                ...(webhook ? { webhook } : {}),
              },
            },
          });
      case 'ROCKETCHAT':
        return () =>
          updateRocketChat({
            variables: {
              name: editModalState?.current?.name,
              patch: {
                ...(notificationName ? { name: notificationName } : {}),
                ...(channel ? { channel } : {}),
                ...(webhook ? { webhook } : {}),
              },
            },
          });
      case 'EMAIL':
        return () =>
          updateEmail({
            variables: {
              name: editModalState?.current?.name,
              patch: {
                ...(notificationName ? { name: notificationName } : {}),
                ...(email ? { emailAddress: email } : {}),
              },
            },
          });
      case 'MICROSOFTTEAMS':
        return () =>
          updateTeams({
            variables: {
              name: editModalState?.current?.name,
              patch: {
                ...(notificationName ? { name: notificationName } : {}),
                ...(webhook ? { webhook } : {}),
              },
            },
          });
      case 'WEBHOOK':
        return () =>
          updateWebhook({
            variables: {
              name: editModalState?.current?.name,
              patch: {
                ...(notificationName ? { name: notificationName } : {}),
                ...(webhook ? { webhook } : {}),
              },
            },
          });
    }
  };

  const renderFields = () => {
    switch (editModalState?.current?.type) {
      case 'EMAIL':
        return (
          <div className="form-box">
            <label>
              Email Address: <span style={{ color: '#E30000' }}>*</span>
              <input
                className="inputEmail"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </div>
        );
      case 'SLACK':
      case 'ROCKETCHAT':
        return (
          <>
            <div className="form-box">
              <label>
                Webhook: <span style={{ color: '#E30000' }}>*</span>
                <input
                  className="inputWebhook"
                  type="text"
                  placeholder="Enter Webhook"
                  value={webhook}
                  onChange={e => setWebhook(e.target.value)}
                />
              </label>
            </div>

            <div className="form-box">
              <label>
                Channel: <span style={{ color: '#E30000' }}>*</span>
                <input
                  className="inputChannel"
                  type="text"
                  placeholder="Enter channel"
                  value={channel}
                  onChange={e => setChannel(e.target.value)}
                />
              </label>
            </div>
          </>
        );
      case 'MICROSOFTTEAMS':
      case 'WEBHOOK':
        return (
          <div className="form-box">
            <label>
              Webhook: <span style={{ color: '#E30000' }}>*</span>
              <input
                className="inputWebhook"
                type="text"
                placeholder="Enter Webhook"
                value={webhook}
                onChange={e => setWebhook(e.target.value)}
              />
            </label>
          </div>
        );
    }
  };
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
                      <span
                        className="link"
                        onClick={() =>
                          setEditModalState({
                            open: true,
                            current: {
                              name: notification.name,
                              type: notification.type,
                            },
                          })
                        }
                      >
                        <EditOutlined className="edit" />
                      </span>

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

      <Modal style={{ content: { width: '50%' } }} isOpen={editModalState.open} onRequestClose={closeModal}>
        <ModalChildren>
          <div className="form-box">
            <label>
              Name: <span style={{ color: '#E30000' }}>*</span>
              <input
                className="inputName"
                type="text"
                placeholder="Enter name"
                value={notificationName || editModalState.current.name}
                onChange={e => setNotificationName(e.target.value)}
              />
            </label>
          </div>
          {renderFields()}
        </ModalChildren>

        <Footer>
          <Button
            variant="primary"
            action={() => {
              const cb = getAction();
              cb &&
                cb()
                  .then(refresh)
                  .then(() => {
                    closeModal();
                  })
                  .catch(err => console.error(err));
            }}
          >
            Continue
          </Button>

          <Button variant="ghost" action={closeModal}>
            Cancel
          </Button>
        </Footer>
      </Modal>
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
