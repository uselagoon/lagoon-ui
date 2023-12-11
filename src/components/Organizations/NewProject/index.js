import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Image from 'next/image';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/NewProject/logic';
import gql from 'graphql-tag';

import info from '../../../static/images/info.svg';
import { RoleSelect } from '../AddUserToGroup/Styles';
import { AddButtonContent, Footer, StyledNotificationWrapper } from '../SharedStyles';
import { Checkbox, StyledNewProject } from './StyledNewProject';

const ADD_PROJECT_MUTATION = gql`
  mutation addProjectToOrganization(
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
        <Tooltip overlayClassName="orgTooltip" title="Add a new project" placement="bottom">
          <>
            <Button testId="addNewProject" action={openModal}>
              <AddButtonContent>Add project</AddButtonContent>
            </Button>
          </>
        </Tooltip>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_PROJECT_MUTATION} onError={e => console.error(e)}>
            {(addGroupProject, { called, error, data }) => {
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
                          className="inputName"
                          data-cy="project-name"
                          type="text"
                          placeholder="Enter name"
                          value={inputProjectName}
                          onChange={setProjectName}
                        />
                      </label>
                    </div>
                    <div className="form-box">
                      <label>
                        Git URL: <span style={{ color: '#E30000' }}>*</span>{' '}
                        <Tooltip
                          overlayClassName="orgTooltip"
                          title="When using an SSH git URL make sure that you copy the full path and have permission to add a deploy key and webhook. Public repositories can also be used."
                          placement="right"
                        >
                          <InfoCircleOutlined style={{ fontSize: '1rem' }} />
                        </Tooltip>
                        <input
                          className="inputGit"
                          data-cy="input-git"
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
                          className="inputEnv"
                          data-cy="input-env"
                          type="text"
                          placeholder="Enter branch name"
                          value={inputProdEnv}
                          onChange={setProdEnv}
                        />
                      </label>
                    </div>
                    <label>
                      Deploy Target: <span style={{ color: '#E30000' }}>*</span>
                      <RoleSelect>
                        <ReactSelect
                          className="select"
                          styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999, color: 'black', fontSize: '16px' }),
                            placeholder: base => ({ ...base, fontSize: '16px' }),
                            menu: base => ({ ...base, fontSize: '16px' }),
                            option: base => ({ ...base, fontSize: '16px' }),
                            singleValue: base => ({ ...base, fontSize: '16px' }),
                          }}
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
                    <Checkbox>
                      <input
                        type="checkbox"
                        checked={addUserToProject}
                        onChange={({ target: { checked } }) => setAddUserToProject(checked)}
                      />
                      <span>Add my user to this project</span>
                    </Checkbox>
                    <div className="docs-link">
                      <div className="info-icon">
                        <Image src={info} alt="" />
                      </div>
                      <div className="new-project-info">
                        <p>
                          Please note, once the project has been created you will need to add the{' '}
                          <a
                            href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-deploy-key-to-your-git-repository"
                            target="_blank"
                          >
                            Deploy Key
                          </a>{' '}
                          and{' '}
                          <a
                            href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-webhooks-endpoint-to-your-git-repository"
                            target="_blank"
                          >
                            Webhook
                          </a>{' '}
                          to your Git service, these will be generated in the ‘create environment’ wizard available from
                          the project overview page.
                        </p>
                      </div>
                    </div>
                    <div>
                      <Footer>
                        <Button
                          testId="addProjectConfirm"
                          disabled={
                            called ||
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
                                addOrgOwner: addUserToProject,
                              },
                            });
                          }}
                          variant="primary"
                          loading={called}
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