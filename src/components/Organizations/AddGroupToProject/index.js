import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddGroupToProject/logic';
import gql from 'graphql-tag';
import { bp, color } from 'lib/variables';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { Footer, StyledNotification, StyledNotificationWrapper } from '../SharedStyles';

const ADD_GROUP_PROJECT_MUTATION = gql`
  mutation addProjectToGroup($groupName: String!, $projectName: String!) {
    addGroupsToProject(input: { groups: { name: $groupName }, project: { name: $projectName } }) {
      name
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
export const AddGroupToProject = ({
  projectName,
  selectedProject,
  options,
  setSelectedProject,
  open,
  openModal,
  closeModal,
  refresh,
}) => {
  return (
    <StyledNotificationWrapper>
      <div className="margins">
        <Button action={openModal}>
          <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>+</span>
            <span style={{ fontSize: '16px', lineHeight: '24px' }}>Group</span>
          </span>
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_GROUP_PROJECT_MUTATION} onError={e => console.error(e)}>
            {(addGroupProject, { error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(closeModal);
              }
              return (
                <StyledNotification>
                  <h4>Add Group</h4>
                  <label>
                    Group
                    <RoleSelect>
                      <ReactSelect
                        className='select'
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
                        aria-label="Group"
                        placeholder="Select a group..."
                        name="group"
                        value={options.find(o => o.value === selectedProject)}
                        onChange={selectedOption => setSelectedProject(selectedOption)}
                        options={options}
                        required
                      />
                    </RoleSelect>
                  </label>
                  <Footer>
                    <Button
                      disabled={selectedProject === null}
                      action={() => {
                        addGroupProject({
                          variables: {
                            projectName: projectName,
                            groupName: selectedProject.value,
                          },
                        });
                      }}
                      variant="primary"
                    >
                      Add
                    </Button>

                    <Button variant="ghost" action={() => closeModal()}>
                      Cancel
                    </Button>
                  </Footer>
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
