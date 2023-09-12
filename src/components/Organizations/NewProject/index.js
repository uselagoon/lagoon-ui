import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/NewProject/logic';
import gql from 'graphql-tag';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { Footer, StyledNotificationWrapper } from '../SharedStyles';
import {StyledNewProject, Checkbox} from './StyledNewProject';

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
    $addOrgOwner: Boolean
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
        addOrgOwner: $addOrgOwner
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
  const [addUserToProject, setAddUserToProject] = React.useState(true);
  return (
    <StyledNotificationWrapper>
      <div className="margins">
        <Button action={openModal}>
          <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>+</span>
            <span style={{ fontSize: '16px', lineHeight: '24px' }}>Project</span>
          </span>
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_PROJECT_MUTATION} onError={e => console.error(e)}>
            {(addGroupProject, {_, error, data}, systemGroupsSelected) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(() => {
                  setProjectName({ target: { value: '' } });
                  setGitURL({ target: { value: '' } });
                  setProdEnv({ target: { value: '' } });
                  setSelectedDeployTarget({ target: { value: '' } });
                  closeModal();
                });
              }

              return (
                <>
                  <StyledNewProject>
                    <div className="add-project-header">
                      <span>Add Project</span>
                    </div>
                    <div className="form-box">
                      <label>
                        Project name: <span style={{ color: '#E30000' }}>*</span>
                        <input
                          className="inputEmail"
                          type="text"
                          placeholder="Enter name"
                          value={inputProjectName}
                          onChange={setProjectName}
                        />
                      </label>
                    </div>
                    <div className="form-box">
                      <label>
                        Git URL: <span style={{ color: '#E30000' }}>*</span>
                        <input
                          className="inputEmail"
                          type="text"
                          placeholder="Enter URL"
                          value={inputGitURL}
                          onChange={setGitURL}
                        />
                      </label>
                    </div>
                    <div className="form-box">
                      <label>
                        Production Environment: <span style={{ color: '#E30000' }}>*</span>
                        <input
                          className="inputEmail"
                          type="text"
                          placeholder="eg Main or Master"
                          value={inputProdEnv}
                          onChange={setProdEnv}
                        />
                      </label>
                    </div>
                    <label>
                      Deploy Target: <span style={{ color: '#E30000' }}>*</span>
                      <RoleSelect>
                        <ReactSelect
                          className='select'
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
                          aria-label="Role"
                          placeholder="Select target..."
                          name="target"
                          value={options.find(o => o.value === selectedDeployTarget)}
                          onChange={selectedOption => setSelectedDeployTarget(selectedOption)}
                          options={options}
                          required
                        />
                      </RoleSelect>
                    </label>
                    <div className="docs-link">
                      <p>Please note, once the project has been created you will need to copy the <a href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-deploy-key-to-your-git-repository" target="_blank">Deploy Key</a> and <a href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-webhooks-endpoint-to-your-git-repository" target="_blank">Webhook</a> to your Git service, these will be generated in the ‘create environment’ wizard available from the project overview page.</p>
                    </div>
                    <Checkbox>
                      <input
                          type="checkbox"
                          checked={addUserToProject}
                          onChange={({ target: { checked } }) => setAddUserToProject(checked)}
                      />
                      <span>Add my user to this project</span>
                    </Checkbox>
                    <div>
                      <Footer>
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
                                addOrgOwner: addUserToProject
                              },
                            });
                          }}
                          variant="primary"
                        >
                          Add
                        </Button>

                        <Button action={() => closeModal()} variant="ghost">
                          Cancel
                        </Button>
                      </Footer>
                    </div>
                  </StyledNewProject>
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
