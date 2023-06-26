import React from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddNotifications/Webhook/logic';
import gql from 'graphql-tag';

import { StyledNotification, StyledNotificationWrapper } from '../../SharedStyles';

const ADD_WEBHOOK_NOTIFICATION = gql`
  mutation addNotificationWebhook($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationWebhook(input: { organization: $organization, name: $name, webhook: $webhook }) {
      id
    }
  }
`;

const customStyles = {
  content: {
    width: '50%',
  },
};

/**
 * Confirms the deletion of the specified name and type.
 */
export const AddWebhookNotification = ({
  organizationId,
  inputValueName,
  inputValueWebhook,
  setInputName,
  setInputWebhook,
  open,
  openModal,
  closeModal,
  refresh,
}) => {
  return (
    <StyledNotificationWrapper>
      <div className="margins">
        <Button action={openModal}>New Webhook</Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_WEBHOOK_NOTIFICATION}>
            {(addNotification, { _, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(closeModal);
              }
              return (
                <StyledNotification>
                  <h4>New Webhook notification</h4>
                  <div className="form-box">
                    <label>
                      Name: <input className="inputEmail" type="text" value={inputValueName} onChange={setInputName} />
                    </label>
                  </div>
                  <div className="form-box">
                    <label>
                      Webhook:{' '}
                      <input className="inputEmail" type="text" value={inputValueWebhook} onChange={setInputWebhook} />
                    </label>
                  </div>
                  <div>
                    <p></p>
                    <Button
                      disabled={inputValueName === '' || inputValueWebhook === ''}
                      action={() => {
                        addNotification({
                          variables: {
                            name: inputValueName,
                            webhook: inputValueWebhook,
                            organization: organizationId,
                          },
                        });
                      }}
                      variant="green"
                    >
                      Create
                    </Button>
                  </div>
                </StyledNotification>
              );
            }}
          </Mutation>
        </React.Fragment>
      </Modal>
    </StyledNotificationWrapper>
  );
};
export default withLogic(AddWebhookNotification);
