import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { bp, color } from 'lib/variables';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddNotifications/MicrosoftTeams/logic';
import ReactSelect from 'react-select';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Box from 'components/Box';

const ADD_MICROSOFTTEAMS_NOTIFICATION = gql`
  mutation addNotificationMicrosoftTeams($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationMicrosoftTeams(input:{
      organization: $organization
      name: $name
      webhook: $webhook
    }){
      id
    }
  }
`;

const customStyles = {
  content : {
    width : '50%',
  }
};

/**
 * Confirms the deletion of the specified name and type.
 */
export const AddMicrosoftTeamsNotification = ({
  organizationId,
  inputValueName,
  inputValueChannel,
  inputValueWebhook,
  setInputName,
  setInputWebhook,
  setInputChannel,
  onProceed,
  open,
  openModal,
  closeModal
}) => {
  return (
    <React.Fragment>
      <div className="margins"><Button action={openModal}>
        Add MicrosoftTeams
      </Button></div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        style={customStyles}
      >
        <React.Fragment>
        <Mutation mutation={ADD_MICROSOFTTEAMS_NOTIFICATION}>
          {(addNotification, {loading, error, data}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data) {
              window.location.reload();
            }
            return (
              <div className="newMember">
                <h4>Create microsoftteams notification</h4>
                <div className="form-box">
                  <label>Notification Name: <input className="inputEmail" type="text" value={inputValueName} onChange={setInputName} /></label>
                </div>
                <div className="form-box">
                  <label>Notification Webhook: <input className="inputEmail" type="text" value={inputValueWebhook} onChange={setInputWebhook} /></label>
                </div>
                <div>
                  <p></p>
                  <Button
                    disabled={inputValueName === "" || inputValueWebhook === "" }
                    action={() => {
                      addNotification({
                      variables: {
                          name: inputValueName,
                          webhook: inputValueWebhook,
                          organization: organizationId,
                        }
                      });
                      }
                    }
                    variant='green'
                  >Add
                  </Button>
                </div>
              </div>
            );
          }}
          </Mutation>
        </React.Fragment>
      </Modal>
      <style jsx>{`
        .margins{
          margin-right: 10px;
        }
        .modal-content {
          max-width: 70%;
        }
        .form-box input, textarea{
          display: block;
          width: 100%;
          border-width:1px;
          border-style: solid;
          border-radius: 4px;
          min-height: 38px;
          border-color: hsl(0,0%,80%);
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          color: #5f6f7a;
          padding: 8px;
          box-sizing: border-box;
        }
        input[type="text"]:focus {
          border: 2px solid ${color.linkBlue};
          outline: none;
        }
        .selectRole {
          font-family: 'source-sans-pro', sans-serif;
          line-height: 1.25rem;
        }
        .environment-name {
          font-weight: bold;
          color: ${color.lightBlue};
        }
        a.hover-state {
          margin-right: 10px;
          color: ${color.blue};
        }
        .form-input {
          display: flex;
          align-items: center;
        }
      `}</style>
    </React.Fragment>
  );
};
export default withLogic(AddMicrosoftTeamsNotification);
