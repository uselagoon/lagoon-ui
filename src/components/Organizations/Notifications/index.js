import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveNotificationConfirm from 'components/Organizations/RemoveNotificationConfirm';
import gql from 'graphql-tag';

import OrgHeader from '../Orgheader';
import { AddButtonContent, Footer, ModalChildren, ViewMore } from '../SharedStyles';
import AddNotifications from './AddNotifications';
import { AddNotifButton, NameTagCol, StyledOrgNotifications } from './Styles';

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

  const [modalOpen, setModalOpen] = useState(false);

  const [valueModalOpen, setValueModalOpen] = useState(false);

  const initialEditState = {
    open: false,
    type: '',
    current: {},
  };

  const [editState, setEditState] = useState(initialEditState);

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
  return (
    <StyledOrgNotifications>
      <OrgHeader
        headerText="Notifications"
        searchBar
        searchProps={{
          value: searchInput,
          onChange: e => setSearchInput(e.target.value),
        }}
      />

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
          <div className="data-row" data-cy="notification-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="slack-group-label">SLACK</label>
              </div>
            </NameTagCol>
            <div className="notifdata">
              {renderWebbook(project.webhook, () => {
                setEditState({ open: false, current: project });
              })}
              <p> Channel: {project.channel}</p>
            </div>
            <div className="actions">
              <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
                <span
                  className="link"
                  onClick={() => {
                    setEditState({ open: true, current: project, type: 'slack' });
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
                                name: project.name,
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
              <div className="remove">
                <Mutation mutation={REMOVE_NOTIFICATION_SLACK} onError={e => console.error(e)}>
                  {(removeNotification, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refresh();
                    }
                    return (
                      <RemoveNotificationConfirm
                        loading={called}
                        info={{ name: project.name }}
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
          </div>
        ))}
        {filteredRocketChatNotifications.map(project => (
          <div className="data-row" data-cy="notification-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="rocketchat-group-label">ROCKETCHAT</label>
              </div>
            </NameTagCol>
            <div className="notifdata">
              {renderWebbook(project.webhook, () => {
                setEditState({ open: false, current: project });
              })}
              <p>Channel: {project.channel}</p>
            </div>
            <div className="actions">
              <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
                <span
                  className="link"
                  onClick={() => setEditState({ open: true, current: project, type: 'rocketchat' })}
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
                                name: project.name,
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
              <div className="remove">
                <Mutation mutation={REMOVE_NOTIFICATION_ROCKETCHAT} onError={e => console.error(e)}>
                  {(removeNotification, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refresh();
                    }
                    return (
                      <RemoveNotificationConfirm
                        loading={called}
                        info={{ name: project.name }}
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
          </div>
        ))}
        {filteredEmailNotifications.map(project => (
          <div className="data-row" data-cy="notification-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="email-group-label">EMAIL</label>
              </div>
            </NameTagCol>
            <div className="notifdata">
              <p>Address: {project.emailAddress}</p>
            </div>
            <div className="actions">
              <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
                <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'email' })}>
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
                                name: project.name,
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
              <div className="remove">
                <Mutation mutation={REMOVE_NOTIFICATION_EMAIL} onError={e => console.error(e)}>
                  {(removeNotification, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refresh();
                    }
                    return (
                      <RemoveNotificationConfirm
                        loading={called}
                        info={{ name: project.name }}
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
          </div>
        ))}
        {filteredWebhookNotifications.map(project => (
          <div className="data-row" data-cy="notification-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="webhook-group-label">WEBHOOK</label>
              </div>
            </NameTagCol>
            <div className="notifdata">
              {renderWebbook(project.webhook, () => {
                setEditState({ open: false, current: project });
              })}
            </div>
            <div className="actions">
              <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
                <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'webhook' })}>
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
                                name: project.name,
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

              <div className="remove">
                <Mutation mutation={REMOVE_NOTIFICATION_WEBHOOK} onError={e => console.error(e)}>
                  {(removeNotification, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refresh();
                    }
                    return (
                      <RemoveNotificationConfirm
                        loading={called}
                        info={{ name: project.name }}
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
          </div>
        ))}
        {filteredTeamsNotifications.map(project => (
          <div className="data-row" data-cy="notification-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="microsoftteams-group-label">TEAMS</label>
              </div>
            </NameTagCol>

            <div className="notifdata">
              {renderWebbook(project.webhook, () => {
                setEditState({ open: false, current: project });
              })}
            </div>
            <div className="actions">
              <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit notification">
                <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'teams' })}>
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
                                name: project.name,
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
              <div className="remove">
                <Mutation mutation={REMOVE_NOTIFICATION_TEAMS} onError={e => console.error(e)}>
                  {(removeNotification, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refresh();
                    }
                    return (
                      <RemoveNotificationConfirm
                        loading={called}
                        info={{ name: project.name }}
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
          </div>
        ))}
      </div>

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