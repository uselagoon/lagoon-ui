import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/NewProject/logic';
import gql from 'graphql-tag';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { AddButtonContent, Footer, StyledNotification, StyledNotificationWrapper } from '../SharedStyles';

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
        <Button action={openModal}>
          <AddButtonContent>
            <span>+</span>
            <span>Project</span>
          </AddButtonContent>
        </Button>
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
                  <StyledNotification>
                    <h4>Add Project</h4>
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
                    <div>
                      <Footer>
                        <Button
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
