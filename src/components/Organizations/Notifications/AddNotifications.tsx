import { FC, ReactNode, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import Modal from 'components/Modal';
import gql from 'graphql-tag';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { Footer, StyledNotification } from '../SharedStyles';

interface Props {
  modalOpen: boolean;
  organizationId: string;
  onNotificationAdded: () => Promise<unknown>;
  closeModal: () => void;
  children: ReactNode;
}

const options = [
  {
    label: 'Slack',
    value: 'slack',
  },
  {
    label: 'Discord',
    value: 'discord',
  },
  {
    label: 'RocketChat',
    value: 'rocketchat',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Microsoft Teams',
    value: 'teams',
  },
  {
    label: 'Webhook',
    value: 'webhook',
  },
];

const ADD_SLACK_NOTIFICATION = gql`
  mutation addNotificationSlack($organization: Int!, $name: String!, $channel: String!, $webhook: String!) {
    addNotificationSlack(input: { organization: $organization, name: $name, channel: $channel, webhook: $webhook }) {
      id
    }
  }
`;

const ADD_DISCORD_NOTIFICATION = gql`
  mutation addNotificationDiscord($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationDiscord(input: { organization: $organization, name: $name, webhook: $webhook }) {
      id
    }
  }
`;

const ADD_ROCKETCHAT_NOTIFICATION = gql`
  mutation addNotificationRocketChat($organization: Int!, $name: String!, $channel: String!, $webhook: String!) {
    addNotificationRocketChat(
      input: { organization: $organization, name: $name, channel: $channel, webhook: $webhook }
    ) {
      id
    }
  }
`;

const ADD_EMAIL_NOTIFICATION = gql`
  mutation addNotificationEmail($organization: Int!, $name: String!, $emailAddress: String!) {
    addNotificationEmail(input: { organization: $organization, name: $name, emailAddress: $emailAddress }) {
      id
    }
  }
`;
const ADD_MICROSOFTTEAMS_NOTIFICATION = gql`
  mutation addNotificationMicrosoftTeams($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationMicrosoftTeams(input: { organization: $organization, name: $name, webhook: $webhook }) {
      id
    }
  }
`;

const ADD_WEBHOOK_NOTIFICATION = gql`
  mutation addNotificationWebhook($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationWebhook(input: { organization: $organization, name: $name, webhook: $webhook }) {
      id
    }
  }
`;

const AddNotification: FC<Props> = ({ modalOpen, organizationId, onNotificationAdded, closeModal, children }) => {
  const [selectedService, setSelectedService] = useState<SingleValue<{ label: string; value: string }>>();

  const [notificationName, setNotificationName] = useState('');
  const [email, setEmail] = useState('');
  const [webhook, setWebhook] = useState('');
  const [channel, setChannel] = useState('');

  const [addSlack] = useMutation(ADD_SLACK_NOTIFICATION);
  const [addDiscord] = useMutation(ADD_DISCORD_NOTIFICATION);
  const [addRocketChat] = useMutation(ADD_ROCKETCHAT_NOTIFICATION);
  const [addEmail] = useMutation(ADD_EMAIL_NOTIFICATION);
  const [addTeams] = useMutation(ADD_MICROSOFTTEAMS_NOTIFICATION);
  const [addWebhook] = useMutation(ADD_WEBHOOK_NOTIFICATION);

  const [loading, setLoading] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);

  const resetState = () => {
    setNotificationName('');
    setEmail('');
    setWebhook('');
    setChannel('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const getAction = () => {
    switch (selectedService?.value) {
      case 'slack':
        return () =>
          addSlack({
            variables: {
              organization: organizationId,
              name: notificationName,
              channel: channel,
              webhook: webhook,
            },
          });
      case 'discord':
        return () =>
          addDiscord({
            variables: {
              name: notificationName,
              webhook: webhook,
              organization: organizationId,
            },
          });
      case 'rocketchat':
        return () =>
          addRocketChat({
            variables: {
              organization: organizationId,
              name: notificationName,
              channel: channel,
              webhook: webhook,
            },
          });
      case 'email':
        return () =>
          addEmail({
            variables: {
              name: notificationName,
              emailAddress: email,
              organization: organizationId,
            },
          });
      case 'teams':
        return () =>
          addTeams({
            variables: {
              name: notificationName,
              webhook: webhook,
              organization: organizationId,
            },
          });
      case 'webhook':
        return () =>
          addWebhook({
            variables: {
              name: notificationName,
              webhook: webhook,
              organization: organizationId,
            },
          });
    }
  };

  const renderFields = () => {
    switch (selectedService?.value) {
      case 'email':
        return (
          <div className="form-box">
            <label>
              Email Address: <span style={{ color: '#E30000' }}>*</span>
              <input
                className="inputEmail"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={e => handleEmailChange(e)}
              />
            </label>
            {!isValidEmail && <p style={{ color: '#E30000' }}>Invalid email address</p>}
          </div>
        );
      case 'slack':
      case 'rocketchat':
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
      case 'teams':
      case 'webhook':
      case 'discord':
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
    <>
      {children}
      <Modal
        variant={null}
        style={{
          content: {
            width: '50%',
          },
        }}
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Notification"
      >
        <h4>Add Notification</h4>
        <StyledNotification>
          <label>
            Select service: <span style={{ color: '#E30000' }}>*</span>
            <RoleSelect>
              <ReactSelect
                classNamePrefix="react-select"
                className="select"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999, color: 'black', fontSize: '16px' }),
                  placeholder: base => ({ ...base, fontSize: '16px' }),
                  menu: base => ({ ...base, fontSize: '16px' }),
                  option: base => ({ ...base, fontSize: '16px' }),
                  singleValue: base => ({ ...base, fontSize: '16px' }),
                }}
                aria-label="service"
                placeholder="Make a selection"
                name="service"
                value={options.find(o => o.value === selectedService?.value)}
                onChange={selectedOption => setSelectedService(selectedOption)}
                options={options}
                required
              />
            </RoleSelect>
          </label>

          <div className="form-box">
            <label>
              Name: <span style={{ color: '#E30000' }}>*</span>
              <input
                className="inputName"
                type="text"
                placeholder="Enter name"
                value={notificationName}
                onChange={e => setNotificationName(e.target.value)}
              />
            </label>
          </div>

          {renderFields()}
          <Footer>
            <Button
              testId="addNotifBtn"
              action={() => {
                const cb = getAction();

                if (cb) {
                  setLoading(true);
                  cb()
                    .then(() => {
                      void onNotificationAdded();
                    })
                    .then(() => {
                      resetState();
                      closeModal();
                    })
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false));
                }
              }}
              variant="primary"
              loading={loading}
              disabled={loading || (selectedService?.value === 'email' && !isValidEmail)}
            >
              Add
            </Button>

            <Button testId="cancel" variant="ghost" action={() => closeModal()}>
              Cancel
            </Button>
          </Footer>
        </StyledNotification>
      </Modal>
    </>
  );
};

export default AddNotification;
