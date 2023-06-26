import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/NewProject/logic';
import gql from 'graphql-tag';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { StyledNotification, StyledNotificationWrapper } from '../SharedStyles';

const ADD_PROJECT_MUTATION = gql`
  mutation (
    $organization: Int!
    $name: String!
    $gitUrl: String!
    $subfolder: String
    $kubernetes: Int!
    $branches: String
    $pullrequests: String
    $productionEnvironment: String!
    $developmentEnvironmentsLimit: Int
  ) {
    addProject(
      input: {
        organization: $organization
        name: $name
        gitUrl: $gitUrl
        subfolder: $subfolder
        kubernetes: $kubernetes
        branches: $branches
        pullrequests: $pullrequests
        productionEnvironment: $productionEnvironment
        developmentEnvironmentsLimit: $developmentEnvironmentsLimit
      }
    ) {
      id
      name
    }
  }
`;

const customStyles = {
  content: {
    width: '50%',
  },
};

const OrgNewProject = ({
  inputProjectName,
  inputGitURL,
  inputProdEnv,
  organizationId,
  setProjectName,
  setGitURL,
  setProdEnv,
  options,
  selectedDeployTarget,
  setSelectedDeployTarget,
  open,
  openModal,
  closeModal,
  refresh,
}) => {
  return (
    <StyledNotificationWrapper>
      <div className="margins">
        <Button action={openModal}>New Project</Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_PROJECT_MUTATION}>
            {(addGroupProject, { _, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(closeModal);
              }

              return (
                <>
                  <StyledNotification>
                    <h4>New Project</h4>
                    <div className="form-box">
                      <label>
                        Name:{' '}
                        <input className="inputEmail" type="text" value={inputProjectName} onChange={setProjectName} />
                      </label>
                    </div>
                    <div className="form-box">
                      <label>
                        Git URL: <input className="inputEmail" type="text" value={inputGitURL} onChange={setGitURL} />
                      </label>
                    </div>
                    <div className="form-box">
                      <label>
                        Production Environment:{' '}
                        <input className="inputEmail" type="text" value={inputProdEnv} onChange={setProdEnv} />
                      </label>
                    </div>
                    {/* <div className="form-box">
                  <label>Branches (true, false, or regex): <input className="inputEmail" type="text" value={inputBranches} onChange={setBranches} /></label>
                  </div>
                  <div className="form-box">
                  <label>Pullrequests (true, false, or regex): <input className="inputEmail" type="text" value={inputPRs} onChange={setPRs} /></label>
                  </div> */}
                    <label>
                      Deploy Target:
                      <RoleSelect>
                        <ReactSelect
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
                          aria-label="Role"
                          placeholder="Select a target..."
                          name="target"
                          value={options.find(o => o.value === selectedDeployTarget)}
                          onChange={selectedOption => setSelectedDeployTarget(selectedOption)}
                          options={options}
                          required
                        />
                      </RoleSelect>
                    </label>
                    <div>
                      <p></p>
                      <Button
                        disabled={
                          inputProjectName === '' ||
                          inputProjectName.indexOf(' ') > 0 ||
                          inputGitURL === '' ||
                          inputGitURL.indexOf(' ') > 0 ||
                          inputProdEnv === '' ||
                          inputProdEnv.indexOf(' ') > 0 ||
                          selectedDeployTarget === undefined
                        }
                        action={() => {
                          addGroupProject({
                            variables: {
                              name: inputProjectName,
                              gitUrl: inputGitURL,
                              kubernetes: parseInt(selectedDeployTarget.value, 10),
                              productionEnvironment: inputProdEnv,
                              organization: parseInt(organizationId, 10),
                              // branches: inputBranches,
                              // pullrequests: inputPRs,
                            },
                          });
                        }}
                        variant="green"
                      >
                        Create
                      </Button>
                    </div>
                  </StyledNotification>
                </>
              );
            }}
          </Mutation>
        </React.Fragment>
      </Modal>
    </StyledNotificationWrapper>
  );
};

export default withLogic(OrgNewProject);
