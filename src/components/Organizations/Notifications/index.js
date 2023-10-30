import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { EditOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveNotificationConfirm from 'components/Organizations/RemoveNotificationConfirm';
import gql from 'graphql-tag';

import OrgHeader from '../Orgheader';
import { AddButtonContent, Footer, ModalChildren } from '../SharedStyles';
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

  const initialEditState = {
    open: false,
    type: '',
    current: {},
  };

  const [editState, setEditState] = useState(initialEditState);

  const [notificationName, setNotificationName] = useState('');
  const [email, setEmail] = useState('');
  const [webhook, setWebhook] = useState('');
  const [channel, setChannel] = useState('');

  const closeEditModal = () => {
    setEditState(initialEditState);
    setNotificationName('');
    setEmail('');
    setWebhook('');
    setChannel('');
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
          <div className="data-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="slack-group-label">SLACK</label>
              </div>
            </NameTagCol>
            <div className="notifdata">
              Webhook: {project.webhook}
              <br></br>
              Channel: {project.channel}
            </div>
            <div className="actions">
              <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'slack' })}>
                <EditOutlined className="edit" />
              </span>
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
                        type="text"
                        placeholder="Enter name"
                        value={notificationName || editState.current.name}
                        onChange={e => setNotificationName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-box">
                    <label>
                      Webhook: <span style={{ color: '#E30000' }}>*</span>
                      <input
                        className="inputWebhook"
                        type="text"
                        placeholder="Enter Webhook"
                        value={webhook || editState.current.webhook}
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
                        value={channel || editState.current.channel}
                        onChange={e => setChannel(e.target.value)}
                      />
                    </label>
                  </div>
                </ModalChildren>
                <Footer>
                  <Mutation mutation={UPDATE_NOTIFICATION_SLACK} onError={e => console.error(e)}>
                    {(updateSlack, { called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
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
                                name: editState.current.name,
                                patch: {
                                  ...(notificationName ? { name: notificationName } : {}),
                                  ...(channel ? { channel } : {}),
                                  ...(webhook ? { webhook } : {}),
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
          <div className="data-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="rocketchat-group-label">ROCKETCHAT</label>
              </div>
            </NameTagCol>
            <div className="notifdata">
              Webhook: {project.webhook}
              <br></br>
              Channel: {project.channel}
            </div>
            <div className="actions">
              <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'rocketchat' })}>
                <EditOutlined className="edit" />
              </span>
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
                        type="text"
                        placeholder="Enter name"
                        value={notificationName || editState.current.name}
                        onChange={e => setNotificationName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-box">
                    <label>
                      Webhook: <span style={{ color: '#E30000' }}>*</span>
                      <input
                        className="inputWebhook"
                        type="text"
                        placeholder="Enter Webhook"
                        value={webhook || editState.current.webhook}
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
                        value={channel || editState.current.channel}
                        onChange={e => setChannel(e.target.value)}
                      />
                    </label>
                  </div>
                </ModalChildren>
                <Footer>
                  <Mutation mutation={UPDATE_NOTIFICATION_ROCKETCHAT} onError={e => console.error(e)}>
                    {(updateRocketChat, { called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
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
                                name: editState.current.name,
                                patch: {
                                  ...(notificationName ? { name: notificationName } : {}),
                                  ...(channel ? { channel } : {}),
                                  ...(webhook ? { webhook } : {}),
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
          <div className="data-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="email-group-label">EMAIL</label>
              </div>
            </NameTagCol>
            <div className="notifdata">Address: {project.emailAddress}</div>
            <div className="actions">
              <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'email' })}>
                <EditOutlined className="edit" />
              </span>
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
                        type="text"
                        placeholder="Enter name"
                        value={notificationName || editState.current.name}
                        onChange={e => setNotificationName(e.target.value)}
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
                        value={email || editState.current.emailAddress}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                </ModalChildren>
                <Footer>
                  <Mutation mutation={UPDATE_NOTIFICATION_EMAIL} onError={e => console.error(e)}>
                    {(updateEmail, { called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
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
                            updateEmail({
                              variables: {
                                name: editState.current.name,
                                patch: {
                                  ...(notificationName ? { name: notificationName } : {}),
                                  ...(email ? { emailAddress: email } : {}),
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
          <div className="data-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="webhook-group-label">WEBHOOK</label>
              </div>
            </NameTagCol>
            <div className="notifdata">Webhook: {project.webhook}</div>
            <div className="actions">
              <span className="link" onClick={() => setEditState({ open: true, current: project, type: 'webhook' })}>
                <EditOutlined className="edit" />
              </span>

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
                        type="text"
                        placeholder="Enter name"
                        value={notificationName || editState.current.name}
                        onChange={e => setNotificationName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-box">
                    <label>
                      Webhook: <span style={{ color: '#E30000' }}>*</span>
                      <input
                        className="inputWebhook"
                        type="text"
                        placeholder="Enter Webhook"
                        value={webhook || editState.current.webhook}
                        onChange={e => setWebhook(e.target.value)}
                      />
                    </label>
                  </div>
                </ModalChildren>
                <Footer>
                  <Mutation mutation={UPDATE_NOTIFICATION_WEBHOOK} onError={e => console.error(e)}>
                    {(updateWebhook, { called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
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
                                name: editState.current.name,
                                patch: {
                                  ...(notificationName ? { name: notificationName } : {}),
                                  ...(webhook ? { webhook } : {}),
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
          <div className="data-row" project={project.name} key={project.name}>
            <NameTagCol>
              <div className="name">{project.name}</div>
              <div className="notiftype">
                <label className="microsoftteams-group-label">TEAMS</label>
              </div>
            </NameTagCol>

            <div className="notifdata">Webhook: {project.webhook}</div>
            <div className="actions">
              <span className="link">
                <EditOutlined
                  className="edit"
                  onClick={() => setEditState({ open: true, current: project, type: 'teams' })}
                />
              </span>
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
                        type="text"
                        placeholder="Enter name"
                        value={notificationName || editState.current.name}
                        onChange={e => setNotificationName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-box">
                    <label>
                      Webhook: <span style={{ color: '#E30000' }}>*</span>
                      <input
                        className="inputWebhook"
                        type="text"
                        placeholder="Enter Webhook"
                        value={webhook || editState.current.webhook}
                        onChange={e => setWebhook(e.target.value)}
                      />
                    </label>
                  </div>
                </ModalChildren>
                <Footer>
                  <Mutation mutation={UPDATE_NOTIFICATION_TEAMS} onError={e => console.error(e)}>
                    {(updateTeams, { called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
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
                                name: editState.current.name,
                                patch: {
                                  ...(notificationName ? { name: notificationName } : {}),
                                  ...(webhook ? { webhook } : {}),
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

      <AddNotifications
        organizationId={organizationId}
        onNotificationAdded={refresh}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <AddNotifButton>
          <Button testId="addNotification" action={() => setModalOpen(true)}>
            <AddButtonContent>
              <span>+</span>
              <span>Notification</span>
            </AddButtonContent>
          </Button>
        </AddNotifButton>
      </AddNotifications>
    </StyledOrgNotifications>
  );
};

export default OrgNotifications;
