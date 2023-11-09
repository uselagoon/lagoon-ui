import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddGroupToProject/logic';
import gql from 'graphql-tag';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { AddButtonContent, Footer, StyledNotification, StyledNotificationWrapper } from '../SharedStyles';

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
          <AddButtonContent>Link Group</AddButtonContent>
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_GROUP_PROJECT_MUTATION} onError={e => console.error(e)}>
            {(addGroupProject, { called, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(closeModal);
              }
              return (
                <StyledNotification>
                  <h4>Link Group</h4>
                  <label>
                    Group
                    <RoleSelect>
                      <ReactSelect
                        className="select"
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: base => ({ ...base, zIndex: 9999, color: 'black', fontSize: '16px' }),
                          placeholder: base => ({ ...base, fontSize: '16px' }),
                          menu: base => ({ ...base, fontSize: '16px' }),
                          option: base => ({ ...base, fontSize: '16px' }),
                          singleValue: base => ({ ...base, fontSize: '16px' }),
                        }}
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
                      disabled={called || selectedProject === null}
                      action={() => {
                        addGroupProject({
                          variables: {
                            projectName: projectName,
                            groupName: selectedProject.value,
                          },
                        });
                      }}
                      variant="primary"
                      loading={called}
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
