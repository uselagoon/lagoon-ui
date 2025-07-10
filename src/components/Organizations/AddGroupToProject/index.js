import React from 'react';
import ReactSelect from 'react-select';

import { useMutation } from '@apollo/client';
import { Tooltip } from 'antd';
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
  const [addGroupProject, { error, loading }] = useMutation(ADD_GROUP_PROJECT_MUTATION, {
    variables: {
      projectName: projectName,
      groupName: selectedProject?.value,
    },
    onError: e => console.error(e),
    onCompleted: () => {
      setSelectedProject(null);
      refresh().then(closeModal);
    },
  });

  return (
    <StyledNotificationWrapper>
      <div className="margins">
        <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Link a group to this project">
          <>
            <Button action={openModal} testId="addGroupToProject">
              <AddButtonContent>Link Group</AddButtonContent>
            </Button>
          </>
        </Tooltip>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          {error && <div>{error.message}</div>}
          <StyledNotification>
            <h4>Link Group</h4>
            <label>
              Group
              <RoleSelect>
                <ReactSelect
                  className="select"
                  classNamePrefix="react-select"
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
                disabled={selectedProject === null || loading}
                testId="addGroupToProjectConfirm"
                action={addGroupProject}
                variant="primary"
                loading={loading}
              >
                Add
              </Button>

              <Button testId="cancel" variant="ghost" action={() => closeModal()}>
                Cancel
              </Button>
            </Footer>
          </StyledNotification>
        </React.Fragment>
      </Modal>
    </StyledNotificationWrapper>
  );
};

export default withLogic(AddGroupToProject);
