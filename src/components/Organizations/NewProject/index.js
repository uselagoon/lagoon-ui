import React from 'react';
import { useMutation } from '@apollo/client';
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
  const [pullRequests, setPullRequests] = React.useState('');
  const [branches, setBranches] = React.useState('');

  const [ addGroupProject, { loading, error, reset } ] = useMutation(ADD_PROJECT_MUTATION, {
    variables: {
      name: inputProjectName,
      gitUrl: inputGitURL,
      kubernetes: parseInt(selectedDeployTarget?.value, 10),
      productionEnvironment: inputProdEnv,
      organization: parseInt(organizationId, 10),
      addOrgOwner: addUserToProject,
      ...(pullRequests ? { pullrequests: pullRequests } : {}),
      ...(branches ? { branches } : {}),
    },
    onCompleted: () => {
      refresh().then(() => {
        setProjectName({ target: { value: '' } });
        setGitURL({ target: { value: '' } });
        setProdEnv({ target: { value: '' } });
        setPullRequests('');
        setBranches('');
        setSelectedDeployTarget({ target: { value: '' } });
        handleModalClose();
      });
    },
    onError: e => console.error(e),
  });

  const handleModalClose = () => {
    reset();
    closeModal();
  }

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
      <Modal isOpen={open} onRequestClose={handleModalClose} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <>
            <StyledNewProject>
              { error ?
                <>
                  <p style={{ display: "inline-block" }}>{error?.message} </p>
                  <div style={{ float: 'right' }}>
                    <Button variant="ghost" action={handleModalClose} >
                      Cancel
                    </Button>
                  </div>
                </>
                :
                <>
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

                  <div className="form-box spacetop">
                    <label>
                      Branches{' '}
                      <Tooltip
                        overlayClassName="orgTooltip lg"
                        title={
                          <>
                            <b>[Default: true]</b>
                            <br />
                            <span> Which branches should be deployed, can be one of:</span>
                            <ul className="tooltiplist">
                              <li>true - all branches are deployed </li>

                              <li>false - no branches are deployed</li>

                              <li>
                                regex of all branches that can be deployed (including production), example:
                                '^(main|staging)$'
                              </li>
                            </ul>
                          </>
                        }
                        placement="right"
                      >
                        <InfoCircleOutlined style={{ fontSize: '1rem' }} />
                      </Tooltip>
                      <input
                        type="text"
                        placeholder="Branches"
                        value={branches}
                        onChange={({ target: { value } }) => setBranches(value)}
                      />
                    </label>
                  </div>

                  <div className="form-box">
                    <label>
                      Pull requests{' '}
                      <Tooltip
                        overlayClassName="orgTooltip lg"
                        title={
                          <>
                            <b>[Default: true]</b>
                            <br />
                            <span> Which pull requests should be deployed, can be one of:</span>
                            <ul className="tooltiplist">
                              <li>true - all pull requests are deployed </li>

                              <li>false - no pull requests are deployed</li>

                              <li>regex of all Pull Request titles that can be deployed, example: '[BUILD]'</li>
                            </ul>
                          </>
                        }
                        placement="right"
                      >
                        <InfoCircleOutlined style={{ fontSize: '1rem' }} />
                      </Tooltip>
                      <input
                        placeholder="Pull requests"
                        type="text"
                        value={pullRequests}
                        onChange={({ target: { value } }) => setPullRequests(value)}
                      />
                    </label>
                  </div>

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
                          loading ||
                          inputProjectName === '' ||
                          inputProjectName.indexOf(' ') > 0 ||
                          inputGitURL === '' ||
                          inputGitURL.indexOf(' ') > 0 ||
                          inputProdEnv === '' ||
                          inputProdEnv.indexOf(' ') > 0 ||
                          selectedDeployTarget == undefined
                        }
                        action={addGroupProject}
                        variant="primary"
                        loading={loading}
                      >
                        Add
                      </Button>

                      <Button action={() => handleModalClose()} variant="ghost">
                        Cancel
                      </Button>
                    </Footer>
                  </div>
                </>
              }
            </StyledNewProject>
          </>
        </React.Fragment>
      </Modal>
    </StyledNotificationWrapper>
  );
};

export default withLogic(OrgNewProject);
