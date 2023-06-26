import React from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddNotifications/Email/logic';
import gql from 'graphql-tag';

import { StyledNotification, StyledNotificationWrapper } from '../../SharedStyles';

const ADD_EMAIL_NOTIFICATION = gql`
  mutation addNotificationEmail($organization: Int!, $name: String!, $emailAddress: String!) {
    addNotificationEmail(input: { organization: $organization, name: $name, emailAddress: $emailAddress }) {
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
export const AddEmailNotification = ({
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
        <Button action={openModal}>New Email</Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_EMAIL_NOTIFICATION}>
            {(addNotification, { _, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(closeModal);
              }
              return (
                <StyledNotification>
                  <h4>New Email notification</h4>
                  <div className="form-box">
                    <label>
                      Name: <input className="inputEmail" type="text" value={inputValueName} onChange={setInputName} />
                    </label>
                  </div>
                  <div className="form-box">
                    <label>
                      Email Address:{' '}
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
                            emailAddress: inputValueWebhook,
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
export default withLogic(AddEmailNotification);
