import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Image from 'next/image';

import { LoadingOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/react-hooks';
import { Tag } from 'antd';
import { Tooltip } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'components/Alert';
import Btn from 'components/Button';
import withLogic from 'components/DeleteConfirm/logic';
import DeleteVariable from 'components/DeleteVariable';
import ProjectVariablesLink from 'components/link/ProjectVariables';

import EnvironmentProjectByProjectNameWithEnvVarsValueQuery from '../../lib/query/EnvironmentAndProjectByOpenshiftProjectNameWithEnvVarsValue';
import EnvironmentByProjectNameWithEnvVarsValueQuery from '../../lib/query/EnvironmentByOpenshiftProjectNameWithEnvVarsValue';
import hide from '../../static/images/hide.svg';
import show from '../../static/images/show.svg';
import AddVariable from '../AddVariable';
import { DeleteVariableButton } from '../DeleteVariable/StyledDeleteVariable';
import ViewVariableValue from '../ViewVariableValue';
import {
  StyledEnvironmentVariableDetails,
  StyledProjectVariableTable,
  StyledVariableTable,
  VariableActions,
} from './StyledEnvironmentVariables';

/**
 * Displays the environment variable information.
 */

const hashValue = value => {
  let hashedVal = '●';
  for (let l = 0; l < value.length; l++) {
    hashedVal += '●';
  }
  return hashedVal;
};

const EnvironmentVariables = ({ environment, onVariableAdded }) => {
  let displayVars = environment.envVariables;
  let displayProjectVars = environment.project.envVariables;
  let initValueState = new Array(displayVars.length).fill(false);
  let initProjectValueState = new Array(displayProjectVars.length).fill(false);

  const [valueState, setValueState] = useState(initValueState);
  const [prjValueState, setPrjValueState] = useState(initProjectValueState);
  const [openEnvVars, setOpenEnvVars] = useState(false);
  const [openPrjVars, setOpenPrjVars] = useState(false);
  const [updateVarValue, setUpdateVarValue] = useState('');
  const [updateVarName, setUpdateVarName] = useState('');
  const [updateVarScope, setUpdateVarScope] = useState('');
  const [environmentErrorAlert, setEnvironmentErrorAlert] = useState(false);
  const [projectErrorAlert, setProjectErrorAlert] = useState(false);
  const [action, setAction] = useState('');

  const closeEnvironmentError = () => {
    setEnvironmentErrorAlert(false);
  };

  const closeProjectError = () => {
    setProjectErrorAlert(false);
  };

  const [getEnvVarValues, { loading: envLoading, error: envError, data: envValues }] = useLazyQuery(
    EnvironmentByProjectNameWithEnvVarsValueQuery,
    {
      variables: { openshiftProjectName: environment.openshiftProjectName },
      onError: () => {
        setOpenEnvVars(false);
        setValueState(initValueState);
        setEnvironmentErrorAlert(true);
      },
    }
  );

  if (envValues) {
    displayVars = envValues.environmentVars.envVariables;
  }

  if (envError) console.error(envError);

  const [getPrjEnvVarValues, { loading: prjLoading, error: prjError, data: prjEnvValues }] = useLazyQuery(
    EnvironmentProjectByProjectNameWithEnvVarsValueQuery,
    {
      variables: { openshiftProjectName: environment.openshiftProjectName },
      onError: () => {
        setOpenPrjVars(!openPrjVars);
        setProjectErrorAlert(true);
      },
    }
  );

  if (prjEnvValues) {
    displayProjectVars = prjEnvValues.environmentVars.project.envVariables;
  }

  if (prjError) console.error(prjError);

  const valuesShow = index => {
    setValueState(valueState => valueState.map((el, i) => (i === index ? true : el)));
  };
  const valuesHide = index => {
    setValueState(valueState => valueState.map((el, i) => (i === index ? false : el)));
  };
  const prjValuesShow = index => {
    setPrjValueState(prjValueState => prjValueState.map((el, i) => (i === index ? true : el)));
  };
  const prjValuesHide = index => {
    setPrjValueState(prjValueState => prjValueState.map((el, i) => (i === index ? false : el)));
  };

  const showVarValue = () => {
    getEnvVarValues();
    setOpenEnvVars(!openEnvVars);
    setValueState(initValueState);
    setAction('view');
  };

  const showPrjVarValue = () => {
    getPrjEnvVarValues();
    setOpenPrjVars(!openPrjVars);
    setPrjValueState(initProjectValueState);
  };

  const setUpdateValue = (rowValue, rowName, rowScope) => {
    setUpdateVarValue(rowValue);
    setUpdateVarName(rowName);
    setUpdateVarScope(rowScope);
  };

  const permissionCheck = (action, index = null) => {
    getEnvVarValues();
    setOpenEnvVars(false);
    setAction(action);
    if (action === 'delete') {
      valuesShow(index);
    }
  };

  const renderEnvValue = (envVar, index) => {
    if (envVar.value.length >= 0 && !valueState[index]) {
      return hashValue(envVar.value).substring(0, 25);
    } else if (envVar.value.length >= 100 && valueState[index]) {
      return envVar.value.substring(0, 25) + '..';
    } else if (envVar.value.length === 0 && valueState[index]) {
      return <Tag color="#4578e6">Empty</Tag>;
    } else {
      return envVar.value;
    }
  };

  const renderPrjValue = (projEnvVar, index) => {
    if (projEnvVar.value.length >= 0 && !prjValueState[index]) {
      return hashValue(projEnvVar.value).substring(0, 25);
    } else if (projEnvVar.value.length >= 100 && prjValueState[index]) {
      return projEnvVar.value.substring(0, 25) + '..';
    } else if (projEnvVar.value.length === 0 && prjValueState[index]) {
      return <Tag color="#4578e6">Empty</Tag>;
    } else {
      return projEnvVar.value;
    }
  };

  const renderEnvValues = (envVar, index) => {
    if (envVar.value !== undefined) {
      return (
        <Collapse in={openEnvVars}>
          <div className="varValue" id={index}>
            <div className="showHideContainer">
              {renderEnvValue(envVar, index)}
              <span onClick={!valueState[index] ? () => valuesShow(index) : () => valuesHide(index)}>
                <Image
                  src={!valueState[index] ? show : hide}
                  className="showHide"
                  data-cy="showhide-toggle"
                  style={{ all: 'unset' }}
                  alt=""
                />
              </span>
            </div>
            {envVar.value.length >= 100 && valueState[index] && (
              <ViewVariableValue variableName={envVar.name} variableValue={envVar.value} />
            )}
          </div>
        </Collapse>
      );
    }
  };

  const renderPrjValues = (projEnvVar, index) => {
    if (projEnvVar.value !== undefined) {
      return (
        <Collapse in={openPrjVars}>
          <div className="varValue" id={index}>
            <div className="showHideContainer">
              {renderPrjValue(projEnvVar, index)}
              <span onClick={!prjValueState[index] ? () => prjValuesShow(index) : () => prjValuesHide(index)}>
                <Image
                  src={!prjValueState[index] ? show : hide}
                  className="showHide"
                  data-cy="showhide-toggle"
                  style={{ all: 'unset' }}
                  alt=""
                />
              </span>
            </div>
            {projEnvVar.value.length >= 100 && prjValueState[index] && (
              <ViewVariableValue variableName={projEnvVar.name} variableValue={projEnvVar.value} />
            )}
          </div>
        </Collapse>
      );
    }
  };

  return (
    <StyledEnvironmentVariableDetails className="details">
      <>
        {environmentErrorAlert && (
          <Alert
            type="error"
            closeAlert={closeEnvironmentError}
            header="Unauthorized:"
            message={`You don't have permission to ${action} environment ${
              action === 'view' ? ' variable values' : 'variables'
            }. Contact your administrator to obtain the relevant permissions.`}
          />
        )}
        <div className="header">
          <label>Environment Variables</label>
          <div className="header-buttons">
            <Button onClick={() => permissionCheck('add')} style={{ all: 'unset' }}>
              {environmentErrorAlert ? (
                <Button className="add-variable">Add</Button>
              ) : (
                <AddVariable
                  varProject={environment.project.name}
                  varEnvironment={environment.name}
                  varValues={displayVars}
                  varTarget="Environment"
                  noVars="Add"
                  refresh={onVariableAdded}
                  setEnvironmentErrorAlert={setEnvironmentErrorAlert}
                  action="add"
                  loading={envLoading && action === 'add'}
                  envValues={envValues}
                />
              )}
            </Button>
            {displayVars.length > 0 && (
              <Button
                onClick={() => showVarValue()}
                aria-controls="example-collapse-text"
                data-cy="hideShowValues"
                aria-expanded={openEnvVars}
                className="show-value-btn"
              >
                {!openEnvVars ? 'Show values' : envLoading ? <LoadingOutlined /> : 'Hide values'}
              </Button>
            )}
          </div>
        </div>
        {!displayVars.length && (
          <>
            <hr style={{ margin: '30px 0' }} />
            <div style={{ textAlign: 'center' }}>
              <label>No Environment variables set</label>
            </div>
            <hr style={{ margin: '30px 0' }} />
          </>
        )}
        {displayVars.length > 0 && (
          <div className="field-wrapper env-vars">
            <StyledVariableTable>
              <div className={!envLoading && openEnvVars ? 'values-present table-header' : 'table-header'}>
                <div className="name">
                  <label>Name</label>
                </div>
                <div className="scope">
                  <label>Scope</label>
                </div>
                {!envLoading && (
                  <Collapse in={openEnvVars}>
                    <div className="value">
                      <label>Value</label>
                    </div>
                  </Collapse>
                )}
              </div>
              <div className="data-table" data-cy="environment-table">
                {displayVars.map((envVar, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className={!envLoading && openEnvVars ? 'values-present data-row' : 'data-row'}
                        data-cy="environment-row"
                      >
                        <div className="varName">{envVar.name}</div>
                        <div className="varScope">{envVar.scope}</div>
                        {renderEnvValues(envVar, index)}
                        <div className="varActions">
                          <VariableActions>
                            {!envLoading && (
                              <Collapse in={openEnvVars}>
                                <div className="varUpdate">
                                  <Tooltip
                                    overlayClassName="componentTooltip"
                                    title="Update Variable"
                                    placement="bottom"
                                  >
                                    <Button
                                      onClick={() => setUpdateValue(envVar.value, envVar.name, envVar.scope)}
                                      style={{ all: 'unset' }}
                                    >
                                      <AddVariable
                                        varProject={environment.project.name}
                                        varEnvironment={environment.name}
                                        varValues={displayVars}
                                        varTarget="Environment"
                                        varName={updateVarName}
                                        varValue={updateVarValue}
                                        varScope={updateVarScope}
                                        refresh={onVariableAdded}
                                        icon="edit"
                                        action="edit"
                                      />
                                    </Button>
                                  </Tooltip>
                                </div>
                              </Collapse>
                            )}
                            <div className="varDelete">
                              <Tooltip overlayClassName="componentTooltip" title="Delete Variable" placement="bottom">
                                <Button onClick={() => permissionCheck('delete', index)} style={{ all: 'unset' }}>
                                  {environmentErrorAlert ? (
                                    <DeleteVariableButton>
                                      <Btn index={index} variant="red" icon="bin" className="delete-btn"></Btn>
                                    </DeleteVariableButton>
                                  ) : (
                                    <DeleteVariable
                                      deleteType="Environment variable"
                                      deleteName={envVar.name}
                                      varProject={environment.project.name}
                                      varEnvironment={environment.name}
                                      icon="bin"
                                      refresh={onVariableAdded}
                                      envValues={envValues}
                                      loading={envLoading && action === 'delete'}
                                      valueState={valueState[index]}
                                    />
                                  )}
                                </Button>
                              </Tooltip>
                            </div>
                          </VariableActions>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </StyledVariableTable>
          </div>
        )}
      </>
      {displayVars.length !== 0 ? <hr style={{ margin: '30px 0' }} /> : ''}

      <>
        {projectErrorAlert && (
          <Alert
            type="error"
            closeAlert={closeProjectError}
            header="Unauthorized:"
            message="You don't have permission to view project variable values. Contact your administrator to obtain the relevant permissions."
          />
        )}
        <div className="header">
          <label>Project Variables</label>
          <div className="header-buttons">
            <Button data-cy="addVariable">
              <ProjectVariablesLink projectSlug={environment.project.name} className="deployLink hover-state">
                {displayProjectVars.length !== 0 ? 'Edit' : 'Add'}
              </ProjectVariablesLink>
            </Button>

            {displayProjectVars.length > 0 && (
              <Button
                onClick={() => showPrjVarValue()}
                aria-controls="example-collapse-text"
                aria-expanded={openPrjVars}
                className="show-value-btn"
              >
                {!openPrjVars ? 'Show values' : prjLoading ? <LoadingOutlined /> : 'Hide values'}
              </Button>
            )}
          </div>
        </div>
        {!displayProjectVars.length && (
          <>
            <hr style={{ margin: '30px 0' }} />
            <div style={{ textAlign: 'center' }}>
              <label>No Project variables set</label>
            </div>
            <hr style={{ margin: '30px 0' }} />
          </>
        )}
        {displayProjectVars.length > 0 && (
          <div className="field-wrapper env-vars">
            <StyledProjectVariableTable>
              <div className={!prjLoading && openPrjVars ? 'values-present table-header' : 'table-header'}>
                <div className="name">
                  <label>Name</label>
                </div>
                <div className="scope">
                  <label>Scope</label>
                </div>
                {!prjLoading && (
                  <Collapse in={openPrjVars}>
                    <div className="value">
                      <label>Value</label>
                    </div>
                  </Collapse>
                )}
              </div>
              <div className="data-table" data-cy="environment-table">
                {displayProjectVars.map((projEnvVar, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className={!prjLoading && openPrjVars ? 'values-present data-row' : 'data-row'}
                        data-cy="environment-row"
                      >
                        <div className="varName">{projEnvVar.name}</div>
                        <div className="varScope">{projEnvVar.scope}</div>
                        {renderPrjValues(projEnvVar, index)}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </StyledProjectVariableTable>
          </div>
        )}
      </>
    </StyledEnvironmentVariableDetails>
  );
};

export default withLogic(EnvironmentVariables);
