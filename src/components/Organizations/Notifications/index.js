import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

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
      current: {
        ...prevState.current,
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

      actions: notification => {
        return (
          <>
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
                      value={editState.current.name}
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
                      value={editState.current.webhook}
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
                      value={editState.current.channel}
                      onChange={e => handleInputChange(e, 'channel')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                <Mutation mutation={UPDATE_NOTIFICATION_SLACK} onError={e => console.error(e)}>
                  {(updateSlack, { called, error, data }) => {
                    if (error) {
                      return <div className="error">{error.message}</div>;
                    }
                    if (data) {
                      refresh().then(() => {
                        closeEditModal();
                      });
                    }
                    return (
                      <Button
                        testId="continueEdit"
                        variant="primary"
                        loading={called}
                        disabled={called}
                        action={() => {
                          updateSlack({
                            variables: {
                              name: notification.name,
                              patch: {
                                ...(editState.current.name ? { name: editState.current.name } : {}),
                                ...(editState.current.channel ? { channel: editState.current.channel } : {}),
                                ...(editState.current.webhook ? { webhook: editState.current.webhook } : {}),
                              },
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>

            <Mutation mutation={REMOVE_NOTIFICATION_SLACK} onError={e => console.error(e)}>
              {(removeNotification, { called, error, data }) => {
                if (data) {
                  refresh();
                }
                return (
                  <RemoveNotificationConfirm
                    error={error}
                    openNotificationWithIcon={openNotificationWithIcon}
                    loading={called && !error}
                    info={{ name: notification.name }}
                    onRemove={() =>
                      removeNotification({
                        variables: {
                          name: notification.name,
                        },
                      })
                    }
                  />
                );
              }}
            </Mutation>
          </>
        );
      },
    },
    NotificationRocketChat: {
      label: <label className="rocketchat-group-label">ROCKETCHAT</label>,
      notifData: notification => {
        return notificationColumnMap.NotificationSlack.notifData(notification);
      },
      actions: notification => {
        return (
          <>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span
                className="link"
                onClick={() => setEditState({ open: true, current: notification, type: 'rocketchat' })}
              >
                <EditOutlined className="edit" />
              </span>
            </Tooltip>

            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open && editState.type === 'rocketchat'}
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
                      value={editState.current.name}
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
                      value={editState.current.webhook}
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
                      value={editState.current.channel}
                      onChange={e => handleInputChange(e, 'channel')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                <Mutation mutation={UPDATE_NOTIFICATION_ROCKETCHAT} onError={e => console.error(e)}>
                  {(updateRocketChat, { called, error, data }) => {
                    if (error) {
                      return <div className="error">{error.message}</div>;
                    }
                    if (data) {
                      refresh().then(() => {
                        closeEditModal();
                      });
                    }
                    return (
                      <Button
                        testId="continueEdit"
                        variant="primary"
                        loading={called}
                        disabled={called}
                        action={() => {
                          updateRocketChat({
                            variables: {
                              name: notification.name,
                              patch: {
                                ...(editState.current.name ? { name: editState.current.name } : {}),
                                ...(editState.current.channel ? { channel: editState.current.channel } : {}),
                                ...(editState.current.webhook ? { webhook: editState.current.webhook } : {}),
                              },
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
            <Mutation mutation={REMOVE_NOTIFICATION_ROCKETCHAT} onError={e => console.error(e)}>
              {(removeNotification, { called, error, data }) => {
                if (error) {
                  openNotificationWithIcon(error.message);
                }
                if (data) {
                  refresh();
                }
                return (
                  <RemoveNotificationConfirm
                    loading={called && !error}
                    error={error}
                    openNotificationWithIcon={openNotificationWithIcon}
                    info={{ name: notification.name }}
                    onRemove={() =>
                      removeNotification({
                        variables: {
                          name: notification.name,
                        },
                      })
                    }
                  />
                );
              }}
            </Mutation>
          </>
        );
      },
    },
    NotificationEmail: {
      label: <label className="email-group-label">EMAIL</label>,
      notifData: notification => {
        return (
          <div className="notificationdata">
            <p>Address: {notification.emailAddress}</p>
          </div>
        );
      },
      actions: notification => {
        return (
          <>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span className="link" onClick={() => setEditState({ open: true, current: notification, type: 'email' })}>
                <EditOutlined className="edit" />
              </span>
            </Tooltip>
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open && editState.type === 'email'}
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
                      value={editState.current.name}
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
                      value={editState.current.emailAddress}
                      onChange={e => handleInputChange(e, 'emailAddress')}
                    />
                  </label>
                  {!isValidEmail && <p style={{ color: '#E30000' }}>Invalid email address</p>}
                </div>
              </ModalChildren>
              <Footer>
                <Mutation mutation={UPDATE_NOTIFICATION_EMAIL} onError={e => console.error(e)}>
                  {(updateEmail, { called, error, data }) => {
                    if (error) {
                      return <div className="error">{error.message}</div>;
                    }
                    if (data) {
                      refresh().then(() => {
                        closeEditModal();
                      });
                    }
                    return (
                      <Button
                        testId="continueEdit"
                        loading={called}
                        disabled={called || !isValidEmail}
                        variant="primary"
                        action={() => {
                          updateEmail({
                            variables: {
                              name: notification.name,
                              patch: {
                                ...(editState.current.name ? { name: editState.current.name } : {}),
                                ...(editState.current.emailAddress
                                  ? { emailAddress: editState.current.emailAddress }
                                  : {}),
                              },
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>

            <Mutation mutation={REMOVE_NOTIFICATION_EMAIL} onError={e => console.error(e)}>
              {(removeNotification, { called, error, data }) => {
                if (data) {
                  refresh();
                }
                return (
                  <RemoveNotificationConfirm
                    loading={called && !error}
                    error={error}
                    openNotificationWithIcon={openNotificationWithIcon}
                    info={{ name: notification.name }}
                    onRemove={() =>
                      removeNotification({
                        variables: {
                          name: notification.name,
                        },
                      })
                    }
                  />
                );
              }}
            </Mutation>
          </>
        );
      },
    },
    NotificationWebhook: {
      label: <label className="webhook-group-label">WEBHOOK</label>,

      notifData: notification => {
        return (
          <div className="notificationdata">
            {renderWebbook(notification.webhook, () => {
              setEditState({ open: false, current: notification });
            })}
          </div>
        );
      },
      actions: notification => {
        return (
          <>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span
                className="link"
                onClick={() => setEditState({ open: true, current: notification, type: 'webhook' })}
              >
                <EditOutlined className="edit" />
              </span>
            </Tooltip>
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open && editState.type === 'webhook'}
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
                      value={editState.current.name}
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
                      value={editState.current.webhook}
                      onChange={e => handleInputChange(e, 'webhook')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                <Mutation mutation={UPDATE_NOTIFICATION_WEBHOOK} onError={e => console.error(e)}>
                  {(updateWebhook, { called, error, data }) => {
                    if (error) {
                      return <div className="error">{error.message}</div>;
                    }
                    if (data) {
                      refresh().then(() => {
                        closeEditModal();
                      });
                    }
                    return (
                      <Button
                        testId="continueEdit"
                        loading={called}
                        disabled={called}
                        variant="primary"
                        action={() => {
                          updateWebhook({
                            variables: {
                              name: notification.name,
                              patch: {
                                ...(editState.current.name ? { name: editState.current.name } : {}),
                                ...(editState.current.webhook ? { webhook: editState.current.webhook } : {}),
                              },
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>

            <Mutation mutation={REMOVE_NOTIFICATION_WEBHOOK} onError={e => console.error(e)}>
              {(removeNotification, { called, error, data }) => {
                if (data) {
                  refresh();
                }
                return (
                  <RemoveNotificationConfirm
                    loading={called && !error}
                    error={error}
                    openNotificationWithIcon={openNotificationWithIcon}
                    info={{ name: notification.name }}
                    onRemove={() =>
                      removeNotification({
                        variables: {
                          name: notification.name,
                        },
                      })
                    }
                  />
                );
              }}
            </Mutation>
          </>
        );
      },
    },
    NotificationMicrosoftTeams: {
      label: <label className="microsoftteams-group-label">TEAMS</label>,
      notifData: notification => {
        return (
          <div className="notificationdata">
            {renderWebbook(notification.webhook, () => {
              setEditState({ open: false, current: notification });
            })}
          </div>
        );
      },
      actions: notification => {
        return (
          <>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
              <span className="link" onClick={() => setEditState({ open: true, current: notification, type: 'teams' })}>
                <EditOutlined className="edit" />
              </span>
            </Tooltip>
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editState.open && editState.type === 'teams'}
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
                      value={editState.current.name}
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
                      value={editState.current.webhook}
                      onChange={e => handleInputChange(e, 'webhook')}
                    />
                  </label>
                </div>
              </ModalChildren>
              <Footer>
                <Mutation mutation={UPDATE_NOTIFICATION_TEAMS} onError={e => console.error(e)}>
                  {(updateTeams, { called, error, data }) => {
                    if (error) {
                      return <div className="error">{error.message}</div>;
                    }
                    if (data) {
                      refresh().then(() => {
                        closeEditModal();
                      });
                    }
                    return (
                      <Button
                        testId="continueEdit"
                        loading={called}
                        disabled={called}
                        variant="primary"
                        action={() => {
                          updateTeams({
                            variables: {
                              name: notification.name,
                              patch: {
                                ...(editState.current.name ? { name: editState.current.name } : {}),
                                ...(editState.current.webhook ? { webhook: editState.current.webhook } : {}),
                              },
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeEditModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
            <Mutation mutation={REMOVE_NOTIFICATION_TEAMS} onError={e => console.error(e)}>
              {(removeNotification, { called, error, data }) => {
                if (data) {
                  refresh();
                }
                return (
                  <RemoveNotificationConfirm
                    loading={called && !error}
                    info={{ name: notification.name }}
                    error={error}
                    openNotificationWithIcon={openNotificationWithIcon}
                    onRemove={() =>
                      removeNotification({
                        variables: {
                          name: notification.name,
                        },
                      })
                    }
                  />
                );
              }}
            </Mutation>
          </>
        );
      },
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
