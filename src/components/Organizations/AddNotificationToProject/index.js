import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { bp, color } from 'lib/variables';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddNotificationToProject/logic';
import ReactSelect from 'react-select';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const ADD_PROJECT_NOTIFICATION_MUTATION = gql`
  mutation addNotificationToProject($notificationType: NotificationType!, $notificationName: String!, $projectName: String!) {
    addNotificationToProject(input:{
      notificationType: $notificationType
      notificationName: $notificationName
      project: $projectName
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
export const AddNotificationToProject = ({
  project,
  inputValueEmail,
  projectName,
  organizationId,
  setInputValue,
  selectedProject,
  options,
  setSelectedProject,
  onProceed,
  open,
  openModal,
  closeModal
}) => {
  return (
    <React.Fragment>
      <div className="margins"><Button action={openModal}>
        Add notification to project
      </Button></div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        style={customStyles}
      >
        <React.Fragment>
        <Mutation mutation={ADD_PROJECT_NOTIFICATION_MUTATION}>
          {(addNotificationToProject, {loading, error, data}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data) {
              window.location.reload();
            }
            var ops = [...options.slacks, ...options.rocketchats, ...options.teams, ...options.emails, ...options.webhook]
            var opts = ops.map(group => {return {label: group.__typename.split("Notification")[1].toLowerCase() + ": " + group.name, value: group.__typename.split("Notification")[1].toUpperCase() + ":" + group.name} })
            return (
              <div className="newMember">
                <h4>Add notification to project</h4>
                <label>Group
                <div className="selectRole">
                  <ReactSelect
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    aria-label="Notification"
                    placeholder="Select a notification..."
                    name="notification"
                    value={opts.find(o => o.value === selectedProject)}
                    onChange={selectedOption => setSelectedProject(selectedOption)}
                    options={opts}
                    required
                  />
                </div></label>
                <div>
                  <p></p>
                  <Button
                    disabled={selectedProject === null}
                    action={() => {
                      addNotificationToProject({
                        variables: {
                            projectName: projectName,
                            notificationType: selectedProject.value.split(":")[0],
                            notificationName: selectedProject.value.split(":")[1],
                          }
                        })
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
        optgroup,
        select,
        textarea {
          font-family: 'source-sans-pro', sans-serif;
          line-height: 1.25rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(AddNotificationToProject);
