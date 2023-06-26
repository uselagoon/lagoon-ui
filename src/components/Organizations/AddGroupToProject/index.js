import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { bp, color } from 'lib/variables';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddGroupToProject/logic';
import ReactSelect from 'react-select';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { StyledNotification, StyledNotificationWrapper } from "../SharedStyles";
import { RoleSelect } from '../AddUserToGroup/Styles';


const ADD_GROUP_PROJECT_MUTATION = gql`
  mutation addProjectToGroup($groupName: String!, $projectName: String!) {
    addGroupsToProject(input:{
      groups:{
        name: $groupName
      }
      project:{
        name: $projectName
      }
    }){
      name
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
export const AddGroupToProject = ({
  projectName,
  selectedProject,
  options,
  setSelectedProject,
  open,
  openModal,
  closeModal,
  refresh
}) => {
  return (
    <StyledNotificationWrapper>
      <div className="margins"><Button action={openModal}>
        Add Group
      </Button></div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        style={customStyles}
      >
        <React.Fragment>
        <Mutation mutation={ADD_GROUP_PROJECT_MUTATION}>
          {(addGroupProject, {_, error, data}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data) {
              refresh().then(closeModal);
            }
            return (
              <StyledNotification>
                <h4>Add Group</h4>
                <label>Group
                <RoleSelect>
                  <ReactSelect
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' })}}
                    aria-label="Group"
                    placeholder="Select a group..."
                    name="group"
                    value={options.find(o => o.value === selectedProject)}
                    onChange={selectedOption => setSelectedProject(selectedOption)}
                    options={options}
                    required
                  />
                </RoleSelect></label>
                <div>
                  <p></p>
                  <Button
                    disabled={selectedProject === null}
                    action={() => {
                      addGroupProject({
                      variables: {
                          projectName: projectName,
                          groupName: selectedProject.value,
                        }
                      })
                      }
                    }
                    variant='green'
                  >Add
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

export default withLogic(AddGroupToProject);
