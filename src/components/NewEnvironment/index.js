import React, {useState} from 'react';
import { Mutation } from 'react-apollo';
import Button from 'components/Button';
import Modal from 'components/Modal';
import gql from 'graphql-tag';
import withLogic from 'components/NewEnvironment/logic';
import Image from "next/image";
import show from "../../static/images/show.svg";
import hide from "../../static/images/hide.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {StyledNewEnvironment} from './StyledNewEnvironment';
import {useQuery} from "@apollo/react-hooks";
import ProjectByNameWithDeployKeyQuery from "../../lib/query/ProjectByNameWithDeployKey";
import { Footer, StyledNotificationWrapper } from '../Organizations/SharedStyles';
import getConfig from "next/config";
const { WEBHOOK_URL } = getConfig().publicRuntimeConfig;

const DEPLOY_ENVIRONMENT_BRANCH_MUTATION = gql`
  mutation (
    $project: String!,
    $branch: String!,
    ) {
    deployEnvironmentBranch(input: {
      project:{
        name: $project
      }
      branchName: $branch
    }
    )
  }
`;

const customStyles = {
  content: {
    width: '50%',
  },
};

const hashValue = (value) => {
  let hashedVal = "●";
  for (let l = 0; l < value.length; l++) {
    hashedVal += "●";
  }
  return hashedVal;
};

const NewEnvironment = ({
 inputProjectName,
 productionEnvironment,
 environmentCount,
 inputBranchName,
 setBranchName,
 open,
 openModal,
 closeModal,
 refresh,
 setClear,
 }) => {
  const webhookURL = WEBHOOK_URL ? WEBHOOK_URL : 'https://webhook-handler-lagoon-master.lagoon.ch.amazee.io/';
  let dkValue = "●●●●●●●●●●●●●●●●●●●●●●●●●"
  const [copiedDK, setCopiedDK] = useState(false);
  const [copiedWH, setCopiedWH] = useState(false);
  const [showDKField, setShowDKField] = React.useState(false);
  const [showWHField, setShowWHField] = React.useState(false);
  const [showEnvType, setShowEnvType] = React.useState(false);

  const { loadingDK, error: dkError, data: deployKeyValue } = useQuery(ProjectByNameWithDeployKeyQuery, {
    variables: { name: inputProjectName },
  });

  if (deployKeyValue) {
    dkValue = deployKeyValue.project.publicKey;
  }

  if (dkError) console.error(dkError);

  const toggleShowEnvType = () => {
    inputBranchName !== '' ? setShowEnvType(true) : setShowEnvType(false);
  }
  
  return (
      <StyledNotificationWrapper>
        <div className="margins">
          <Button action={openModal}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '0.25em' }}>
            <span style={{ fontSize: '28px' }}>+</span>
            <span style={{ fontSize: '16px', lineHeight: '24px' }}>Create Environment</span>
          </span>
          </Button>
        </div>
        <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
          <React.Fragment>
            <Mutation mutation={DEPLOY_ENVIRONMENT_BRANCH_MUTATION} onError={e => console.error(e)}>
              {(deployEnvironmentBranch, { loading, error, data }) => {
                if (error) {
                  return <div>{error.message}</div>;
                }
                if (data) {
                  refresh().then(setClear).then(closeModal);
                }

                return (
                    <>
                      <StyledNewEnvironment>
                        <div className="env-modal-header">
                          <span>Create an Environment</span>
                        </div>
                        <div className="modal-step">
                        <span><b>Step 1: </b>Add the branch you wsh to base this environment on, the branch must already exist.</span>
                          <div className="environment-modal">
                            <label>
                              Branch name: <span style={{ color: '#E30000' }}>*</span>
                            </label>
                              <input
                                id="branchName"
                                className="inputBranch"
                                type="text"
                                placeholder="eg Main or Master"
                                value={inputBranchName}
                                onChange={setBranchName}
                                onBlur={() => toggleShowEnvType()}
                              />
                          </div>
                        </div>
                        { environmentCount <= 0 &&
                          <div className="modal-step">
                            <p><b>Step 2: </b>Add this projects Deploy Key to your Git service.</p>
                            <div className="showHideContainer">
                              <div className="copy-field">
                                <div className="field">
                                  {loadingDK ? <div className="loader"></div>
                                      : !showDKField ?
                                          hashValue(dkValue).substring(0, 25)
                                          : dkValue.length > 75 ? dkValue.substring(0, 50) + "..." : dkValue
                                  }
                                </div>
                                <span className="showHide" onClick={() => setShowDKField(!showDKField)}>
                                  <Image
                                      src={showDKField ? show : hide}
                                      className="showHide"
                                      style={{all: "unset"}}
                                      alt=""
                                  />
                                </span>
                                <span className="copied" style={copiedDK ? {top: '-20px', opacity: '0'} : null}>
                                  Copied
                                </span>
                                <CopyToClipboard
                                    text={dkValue}
                                    onCopy={() => {
                                      setCopiedDK(true);
                                      setTimeout(function () {
                                        setCopiedDK(false);
                                      }, 750);
                                    }}
                                >
                                  <span className="copy"/>
                                </CopyToClipboard>
                              </div>
                            </div>
                            <div className="guide-links">
                              <p>Step by step guides</p>
                              <div className="addEnvLinks">
                                <a href="https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys"
                                   target="_blank"><Button>Github</Button></a>
                                <a href="https://docs.gitlab.com/ee/user/project/deploy_keys/"
                                   target="_blank"><Button>GitLab</Button></a>
                                <a href="https://support.atlassian.com/bitbucket-cloud/docs/add-access-keys/"
                                   target="_blank"><Button>Bitbucket</Button></a>
                              </div>
                            </div>
                          </div>
                        }
                        { environmentCount <= 0 &&
                          <div className="modal-step">
                            <p><b>Step 3: </b>Add the webhook to your Git service</p>
                            <div className="showHideContainer">
                              <div className="copy-field">
                                <div className="field">
                                  { !showWHField ?
                                      hashValue(webhookURL).substring(0, 25) : webhookURL
                                  }
                                </div>
                                <span className="showHide" onClick={() => setShowWHField(!showWHField)}>
                                  <Image
                                      src={showWHField ? show : hide}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                  />
                                </span>
                                <span className="copied" style={copiedWH ? { top: '-20px', opacity: '0' } : null}>
                                  Copied
                                </span>
                                <CopyToClipboard
                                    text={webhookURL}
                                    onCopy={() => {
                                      setCopiedWH(true);
                                      setTimeout(function () {
                                        setCopiedWH(false);
                                      }, 750);
                                    }}
                                >
                                  <span className="copy" />
                                </CopyToClipboard>
                              </div>
                            </div>
                            <div className="guide-links">
                              <p>Step by step guides</p>
                              <div className="addEnvLinks">
                                <a href="https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks" target="_blank"><Button>Github</Button></a>
                                <a href="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html" target="_blank"><Button>GitLab</Button></a>
                                <a href="https://support.atlassian.com/bitbucket-cloud/docs/manage-webhooks/" target="_blank"><Button>Bitbucket</Button></a>
                              </div>
                            </div>
                            <div className="docs-link">
                              <p>Please ensure that all steps have been completed before creating your new environment. Follow <a href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-deploy-key-to-your-git-repository" target="_blank">Lagoon Docs</a> for more details.</p>
                            </div>
                          </div>
                        }
                        <div>
                          <Footer>
                            { showEnvType ?
                                <div>Create <span className="envType">{
                                  productionEnvironment === inputBranchName ? 'Production' : 'Development'
                                }</span> environment: <b>{inputBranchName}</b></div>
                              : null
                            }
                            <Button
                                disabled={inputBranchName === ''}
                                action={() => {
                                  deployEnvironmentBranch({
                                    variables: {
                                      branch: inputBranchName,
                                      project: inputProjectName,
                                    },
                                  });
                                }}
                                variant="primary"
                            >
                              {loading ? <div className="loader"></div> : "Create"}
                            </Button>

                            <Button action={() => closeModal()} variant="ghost">
                              Cancel
                            </Button>
                          </Footer>
                        </div>
                      </StyledNewEnvironment>
                    </>
                );
              }}
            </Mutation>
          </React.Fragment>
        </Modal>
      </StyledNotificationWrapper>
  );
};

export default withLogic(NewEnvironment);
