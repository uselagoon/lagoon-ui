import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/client';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip, notification } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveNotificationConfirm from 'components/Organizations/RemoveNotificationConfirm';
import gql from 'graphql-tag';

import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { AddButtonContent, Footer, ModalChildren, TableActions, ViewMore } from '../SharedStyles';
import AddNotifications from './AddNotifications';
import { AddNotifButton, NameTagColumn, StyledOrgNotifications } from './Styles';

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

export const UPDATE_NOTIFICATION_SLACK = gql`
  mutation UpdateNotificationSlack($name: String!, $patch: UpdateNotificationSlackPatchInput) {
    updateNotificationSlack(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
export const UPDATE_NOTIFICATION_ROCKETCHAT = gql`
  mutation UpdateNotificationRocketChat($name: String!, $patch: UpdateNotificationRocketChatPatchInput) {
    updateNotificationRocketChat(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
export const UPDATE_NOTIFICATION_EMAIL = gql`
  mutation UpdateNotificationEmail($name: String!, $patch: UpdateNotificationEmailPatchInput) {
    updateNotificationEmail(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;

export const UPDATE_NOTIFICATION_WEBHOOK = gql`
  mutation UpdateNotificationWebhook($name: String!, $patch: UpdateNotificationWebhookPatchInput) {
    updateNotificationWebhook(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
export const UPDATE_NOTIFICATION_TEAMS = gql`
  mutation UpdateNotificationMicrosoftTeams($name: String!, $patch: UpdateNotificationMicrosoftTeamsPatchInput) {
    updateNotificationMicrosoftTeams(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;

/**
 * The primary list of projects.
 */
const OrgNotifications = ({
                            slacks = [],
                            rocketchats = [],
                            emails = [],
                            teams = [],
                            webhooks = [],
                            refresh,
                            organizationId,
                          }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [valueModalOpen, setValueModalOpen] = useState(false);

  const initialEditState = {
    open: false,
    type: '',
    current: {},
    updated: {},
  };

  const [editState, setEditState] = useState(initialEditState);
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotificationWithIcon = errorMessage => {
    api['error']({
      message: 'There was a problem deleting notification.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };

  const closeEditModal = () => {
    setEditState(initialEditState);
  };

  const closeValueModal = () => {
    setValueModalOpen(false);
  };

  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleInputChange = (e, property) => {
    const newValue = e.target.value;
    setEditState(prevState => ({
      ...prevState,
      updated: {
        ...prevState.updated,
        [property]: newValue,
      },
    }));

    if (property === 'emailAddress') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      newValue && setIsValidEmail(emailRegex.test(newValue));
    }
  };

  const renderWebbook = (webhook, action) => {
    if (webhook.length < 50) return <p>Webhook: {webhook}</p>;

    const openValModal = () => {
      action();
      setValueModalOpen(true);
    };
    return (
      <p>
        Webhook: {webhook.slice(0, 50) + '...'} <ViewMore onClick={openValModal}>VIEW FULL VALUE</ViewMore>
      </p>
    );
  };

  const [updateSlackMutation, { loading: updateSlackLoading, error: updateSlackError }] = useMutation(
    UPDATE_NOTIFICATION_SLACK,
    {
      onError: e => console.error('Update Slack Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh().then(() => {
            closeEditModal();
          });
        }
      },
    }
  );

  const [removeSlackMutation, { loading: removeSlackLoading, error: removeSlackError }] = useMutation(
    REMOVE_NOTIFICATION_SLACK,
    {
      onError: e => console.error('Remove Slack Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh();
        }
      },
    }
  );

  const [updateRocketChatMutation, { loading: updateRocketChatLoading, error: updateRocketChatError }] = useMutation(
    UPDATE_NOTIFICATION_ROCKETCHAT,
    {
      onError: e => console.error('Update RocketChat Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh().then(() => {
            closeEditModal();
          });
        }
      },
    }
  );

  const [removeRocketChatMutation, { loading: removeRocketChatLoading, error: removeRocketChatError }] = useMutation(
    REMOVE_NOTIFICATION_ROCKETCHAT,
    {
      onError: e => {
        console.error('Remove RocketChat Error:', e.message);
        openNotificationWithIcon(e.message);
      },
      onCompleted: data => {
        if (data) {
          refresh();
        }
      },
    }
  );

  const [updateEmailMutation, { loading: updateEmailLoading, error: updateEmailError }] = useMutation(
    UPDATE_NOTIFICATION_EMAIL,
    {
      onError: e => console.error('Update Email Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh().then(() => {
            closeEditModal();
          });
        }
      },
    }
  );

  const [removeEmailMutation, { loading: removeEmailLoading, error: removeEmailError }] = useMutation(
    REMOVE_NOTIFICATION_EMAIL,
    {
      onError: e => console.error('Remove Email Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh();
        }
      },
    }
  );

  const [updateWebhookMutation, { loading: updateWebhookLoading, error: updateWebhookError }] = useMutation(
    UPDATE_NOTIFICATION_WEBHOOK,
    {
      onError: e => console.error('Update Webhook Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh().then(() => {
            closeEditModal();
          });
        }
      },
    }
  );

  const [removeWebhookMutation, { loading: removeWebhookLoading, error: removeWebhookError }] = useMutation(
    REMOVE_NOTIFICATION_WEBHOOK,
    {
      onError: e => console.error('Remove Webhook Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh();
        }
      },
    }
  );

  const [updateTeamsMutation, { loading: updateTeamsLoading, error: updateTeamsError }] = useMutation(
    UPDATE_NOTIFICATION_TEAMS,
    {
      onError: e => console.error('Update Teams Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh().then(() => {
            closeEditModal();
          });
        }
      },
    }
  );

  const [removeTeamsMutation, { loading: removeTeamsLoading, error: removeTeamsError }] = useMutation(
    REMOVE_NOTIFICATION_TEAMS,
    {
      onError: e => console.error('Remove Teams Error:', e.message),
      onCompleted: data => {
        if (data) {
          refresh();
        }
      },
    }
  );

  const notificationColumnMap = {
    NotificationSlack: {
      label: <label className="slack-group-label">SLACK</label>,

      notifData: notification => {
        return (
          <div className="notificationdata">
            {renderWebbook(notification.webhook, () => {
              setEditState({ open: false, current: notification });
            })}
            <p>Channel: {notification.channel}</p>
          </div>
        );
      },
      actions: notification => (
        <Fragment key={notification.name}>
          <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span
                className="link"
                onClick={() => {
                  setEditState({ open: true, current: notification, type: 'slack' });
                }}
              >
                <EditOutlined className="edit" />
              </span>
          </Tooltip>

          {editState.current && editState.current.name === notification.name && (
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open && editState.type === 'slack'}
              onRequestClose={closeEditModal}
            >
              <ModalChildren>
                <div className="form-box">
                  <label>
                    Name: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputName"
                      data-cy="notification-name"
                      type="text"
                      placeholder="Enter name"
                      value={editState.updated?.name || editState.current.name}
                      onChange={e => handleInputChange(e, 'name')}
                    />
                  </label>
                </div>

                <div className="form-box">
                  <label>
                    Webhook: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputWebhook"
                      data-cy="input-webhook"
                      type="text"
                      placeholder="Enter Webhook"
                      value={editState.updated?.webhook || editState.current.webhook}
                      onChange={e => handleInputChange(e, 'webhook')}
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
                      value={editState.updated?.channel || editState.current.channel}
                      onChange={e => handleInputChange(e, 'channel')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                {updateSlackError && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{updateSlackError.message}</div>}
                <Button
                  testId="continueEdit"
                  variant="primary"
                  loading={updateSlackLoading}
                  disabled={updateSlackLoading}
                  action={() => updateSlackMutation({
                    variables: {
                      name: notification.name,
                      patch: {
                        ...(editState.updated.name ? { name: editState.updated.name } : {}),
                        ...(editState.updated.channel ? { channel: editState.updated.channel } : {}),
                        ...(editState.updated.webhook ? { webhook: editState.updated.webhook } : {}),
                      },
                    },
                  })
                  }
                >
                  Continue
                </Button>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          )}
          <RemoveNotificationConfirm
            error={removeSlackError}
            openNotificationWithIcon={openNotificationWithIcon}
            loading={removeSlackLoading}
            info={{ name: notification.name }}
            onRemove={() =>
              removeSlackMutation({
                variables: { name: notification.name },
              })
            }
          />
        </Fragment>
      ),
    },
    NotificationRocketChat: {
      label: <label className="rocketchat-group-label">ROCKETCHAT</label>,
      notifData: notification => notificationColumnMap.NotificationSlack.notifData(notification),
      actions: notification => (
        <Fragment key={notification.name}>
          <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
            <span
              className="link"
              onClick={() => setEditState({ open: true, current: notification, updated: {}, type: 'rocketchat' })}
            >
              <EditOutlined className="edit" />
            </span>
          </Tooltip>

          {editState.current && editState.current.name === notification.name && editState.type === 'rocketchat' && (
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open}
              onRequestClose={closeEditModal}
            >
              <ModalChildren>
                <div className="form-box">
                  <label>
                    Name: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputName"
                      data-cy="notification-name"
                      type="text"
                      placeholder="Enter name"
                      value={editState.updated?.name || editState.current.name}
                      onChange={e => handleInputChange(e, 'name')}
                    />
                  </label>
                </div>

                <div className="form-box">
                  <label>
                    Webhook: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputWebhook"
                      data-cy="input-webhook"
                      type="text"
                      placeholder="Enter Webhook"
                      value={editState.updated?.webhook || editState.current.webhook}
                      onChange={e => handleInputChange(e, 'webhook')}
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
                      value={editState.updated?.channel || editState.current.channel}
                      onChange={e => handleInputChange(e, 'channel')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                {updateRocketChatError && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{updateRocketChatError.message}</div>}
                <Button
                  testId="continueEdit"
                  variant="primary"
                  loading={updateRocketChatLoading}
                  disabled={updateRocketChatLoading}
                  action={() => updateRocketChatMutation({
                    variables: {
                      name: notification.name,
                      patch: {
                        ...(editState.updated.name ? { name: editState.updated.name } : {}),
                        ...(editState.updated.channel ? { channel: editState.updated.channel } : {}),
                        ...(editState.updated.webhook ? { webhook: editState.updated.webhook } : {}),
                      },
                    },
                  })
                  }
                >
                  Continue
                </Button>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          )}
          <RemoveNotificationConfirm
            loading={removeRocketChatLoading}
            error={removeRocketChatError}
            openNotificationWithIcon={openNotificationWithIcon}
            info={{ name: notification.name }}
            onRemove={() =>
              removeRocketChatMutation({
                variables: { name: notification.name },
              })
            }
          />
        </Fragment>
      ),
    },
    NotificationEmail: {
      label: <label className="email-group-label">EMAIL</label>,
      notifData: notification => (
        <div className="notificationdata">
          <p>Address: {notification.emailAddress}</p>
        </div>
      ),
      actions: notification => (
        <Fragment key={notification.name}>
          <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
            <span className="link" onClick={() => setEditState({ open: true, current: notification, updated: {}, type: 'email' })}>
              <EditOutlined className="edit" />
            </span>
          </Tooltip>

          {editState.current && editState.current.name === notification.name && editState.type === 'email' && (
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open}
              onRequestClose={closeEditModal}
            >
              <ModalChildren>
                <div className="form-box">
                  <label>
                    Name: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputName"
                      data-cy="notification-name"
                      type="text"
                      placeholder="Enter name"
                      value={editState.updated?.name || editState.current.name}
                      onChange={e => handleInputChange(e, 'name')}
                    />
                  </label>
                </div>
                <div className="form-box">
                  <label>
                    Email Address: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputEmail"
                      type="text"
                      placeholder="Enter Email"
                      value={editState.updated?.emailAddress || editState.current.emailAddress}
                      onChange={e => handleInputChange(e, 'emailAddress')}
                    />
                  </label>
                  {!isValidEmail && <p style={{ color: '#E30000' }}>Invalid email address</p>}
                </div>
              </ModalChildren>
              <Footer>
                {updateEmailError && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{updateEmailError.message}</div>}
                <Button
                  testId="continueEdit"
                  loading={updateEmailLoading}
                  disabled={updateEmailLoading || !isValidEmail}
                  variant="primary"
                  action={() => updateEmailMutation({
                    variables: {
                      name: notification.name,
                      patch: {
                        ...(editState.updated.name ? { name: editState.updated.name } : {}),
                        ...(editState.updated.emailAddress
                          ? { emailAddress: editState.updated.emailAddress }
                          : {}),
                      },
                    },
                  })
                  }
                >
                  Continue
                </Button>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          )}
          <RemoveNotificationConfirm
            loading={removeEmailLoading}
            error={removeEmailError}
            openNotificationWithIcon={openNotificationWithIcon}
            info={{ name: notification.name }}
            onRemove={() =>
              removeEmailMutation({
                variables: { name: notification.name },
              })
            }
          />
        </Fragment>
      ),
    },
    NotificationWebhook: {
      label: <label className="webhook-group-label">WEBHOOK</label>,
      notifData: notification => (
        <div className="notificationdata">
          {renderWebbook(notification.webhook, () => {
            setEditState({ open: false, current: notification });
          })}
        </div>
      ),
      actions: notification => (
        <Fragment key={notification.name}>
          <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span
                className="link"
                onClick={() => setEditState({ open: true, current: notification, updated: {}, type: 'webhook' })}
              >
                <EditOutlined className="edit" />
              </span>
          </Tooltip>
          {editState.current && editState.current.name === notification.name && editState.type === 'webhook' && (
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open}
              onRequestClose={closeEditModal}
            >
              <ModalChildren>
                <div className="form-box">
                  <label>
                    Name: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputName"
                      data-cy="notification-name"
                      type="text"
                      placeholder="Enter name"
                      value={editState.updated?.name || editState.current.name}
                      onChange={e => handleInputChange(e, 'name')}
                    />
                  </label>
                </div>
                <div className="form-box">
                  <label>
                    Webhook: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputWebhook"
                      data-cy="input-webhook"
                      type="text"
                      placeholder="Enter Webhook"
                      value={editState.updated?.webhook || editState.current.webhook}
                      onChange={e => handleInputChange(e, 'webhook')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                {updateWebhookError && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{updateWebhookError.message}</div>}
                <Button
                  testId="continueEdit"
                  loading={updateWebhookLoading}
                  disabled={updateWebhookLoading}
                  variant="primary"
                  action={() => updateWebhookMutation({
                    variables: {
                      name: notification.name,
                      patch: {
                        ...(editState.updated.name ? { name: editState.updated.name } : {}),
                        ...(editState.updated.webhook ? { webhook: editState.updated.webhook } : {}),
                      },
                    },
                  })
                  }
                >
                  Continue
                </Button>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          )}
          <RemoveNotificationConfirm
            loading={removeWebhookLoading}
            error={removeWebhookError}
            openNotificationWithIcon={openNotificationWithIcon}
            info={{ name: notification.name }}
            onRemove={() =>
              removeWebhookMutation({
                variables: { name: notification.name },
              })
            }
          />
        </Fragment>
      ),
    },
    NotificationMicrosoftTeams: {
      label: <label className="microsoftteams-group-label">TEAMS</label>,
      notifData: notification => (
        <div className="notificationdata">
          {renderWebbook(notification.webhook, () => {
            setEditState({ open: false, current: notification });
          })}
        </div>
      ),
      actions: notification => (
        <Fragment key={notification.name}>
          <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span className="link" onClick={() => setEditState({ open: true, current: notification, updated: {}, type: 'teams' })}>
                <EditOutlined className="edit" />
              </span>
          </Tooltip>
          {editState.current && editState.current.name === notification.name && editState.type === 'teams' && (
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open}
              onRequestClose={closeEditModal}
            >
              <ModalChildren>
                <div className="form-box">
                  <label>
                    Name: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputName"
                      data-cy="notification-name"
                      type="text"
                      placeholder="Enter name"
                      value={editState.updated?.name || editState.current.name}
                      onChange={e => handleInputChange(e, 'name')}
                    />
                  </label>
                </div>
                <div className="form-box">
                  <label>
                    Webhook: <span style={{ color: '#E30000' }}>*</span>
                    <input
                      className="inputWebhook"
                      data-cy="input-webhook"
                      type="text"
                      placeholder="Enter Webhook"
                      value={editState.updated?.webhook || editState.current.webhook}
                      onChange={e => handleInputChange(e, 'webhook')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                {updateTeamsError && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{updateTeamsError.message}</div>}
                <Button
                  testId="continueEdit"
                  loading={updateTeamsLoading}
                  disabled={updateTeamsLoading}
                  variant="primary"
                  action={() => updateTeamsMutation({
                    variables: {
                      name: notification.name,
                      patch: {
                        ...(editState.updated.name ? { name: editState.updated.name } : {}),
                        ...(editState.updated.webhook ? { webhook: editState.updated.webhook } : {}),
                      },
                    },
                  })
                  }
                >
                  Continue
                </Button>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          )}
          <RemoveNotificationConfirm
            loading={removeTeamsLoading}
            error={removeTeamsError}
            openNotificationWithIcon={openNotificationWithIcon}
            info={{ name: notification.name }}
            onRemove={() =>
              removeTeamsMutation({
                variables: { name: notification.name },
              })
            }
          />
        </Fragment>
      ),
    },
  };

  const notificationColumns = [
    {
      width: '25%',
      key: 'name',
      render: notification => {
        return (
          //  data-cy="notification-row">
          <NameTagColumn>
            <div className="name">{notification.name}</div>
            <div className="notiftype">{notificationColumnMap[notification.__typename].label}</div>
          </NameTagColumn>
        );
      },
    },
    {
      width: '50%',
      name: 'notifdata',
      key: 'notifdata',
      render: notification => {
        return notificationColumnMap[notification.__typename].notifData(notification);
      },
    },
    {
      width: '25%',
      name: 'actions',
      key: 'actions',
      render: notification => {
        return <TableActions>{notificationColumnMap[notification.__typename].actions(notification)}</TableActions>;
      },
    },
  ];

  return (
    <StyledOrgNotifications>
      {contextHolder}
      <PaginatedTable
        limit={10}
        data={[...slacks, ...emails, ...rocketchats, ...teams, ...webhooks]}
        columns={notificationColumns}
        labelText="Notifications"
        emptyText="No Notifications"
        disableUrlMutation
        rowTestName="notification-row"
      />

      <Modal style={{ content: { width: '50%' } }} isOpen={valueModalOpen} onRequestClose={closeValueModal}>
        <ModalChildren>
          <div className="notificationItem">
            <p>Notification Name:</p>
            <p>{editState?.current?.name}</p>
          </div>

          <div className="notificationItem">
            <p>Webhook:</p>
            <p>{editState?.current?.webhook} </p>
          </div>
        </ModalChildren>
        <Footer>
          <Button action={closeValueModal}>Close</Button>
        </Footer>
      </Modal>

      <AddNotifications
        organizationId={organizationId}
        onNotificationAdded={refresh}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <AddNotifButton>
          <Tooltip overlayClassName="orgTooltip" title="Add a new notification" placement="bottom">
            <>
              <Button testId="addNotification" action={() => setModalOpen(true)}>
                <AddButtonContent>Add notification</AddButtonContent>
              </Button>
            </>
          </Tooltip>
        </AddNotifButton>
      </AddNotifications>
    </StyledOrgNotifications>
  );
};

export default OrgNotifications;
