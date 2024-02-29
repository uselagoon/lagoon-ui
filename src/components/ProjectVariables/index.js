import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Image from 'next/image';

import { LoadingOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/react-hooks';
import { Tag } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'components/Alert';
import Btn from 'components/Button';
import withLogic from 'components/DeleteConfirm/logic';
import DeleteVariable from 'components/DeleteVariable';

import ProjectByNameWithEnvVarsValueQuery from '../../lib/query/ProjectByNameWithEnvVarsValue';
import hide from '../../static/images/hide.svg';
import show from '../../static/images/show.svg';
import AddVariable from '../AddVariable';
import { DeleteVariableButton } from '../DeleteVariable/StyledDeleteVariable';
import ViewVariableValue from '../ViewVariableValue';
import { StyledProjectVariableTable, StyledProjectVariablesDetails, VariableActions } from './StyledProjectVariables';

/**
 * Displays the projects variable information.
 */

const hashValue = value => {
  let hashedVal = '●';
  for (let l = 0; l < value.length; l++) {
    hashedVal += '●';
  }
  return hashedVal;
};

const ProjectVariables = ({ project, onVariableAdded, closeModal }) => {
  let displayVars = project.envVariables;
  let initValueState = new Array(displayVars.length).fill(false);

  const [valueState, setValueState] = useState(initValueState);
  const [openPrjVars, setOpenPrjVars] = useState(false);
  const [updateVarValue, setUpdateVarValue] = useState('');
  const [updateVarName, setUpdateVarName] = useState('');
  const [updateVarScope, setUpdateVarScope] = useState('');
  const [projectErrorAlert, setProjectErrorAlert] = useState(false);
  const [action, setAction] = useState('');

  const closeProjectError = () => {
    setProjectErrorAlert(false);
  };

  const [getPrjEnvVarValues, { loading: prjLoading, error: prjError, data: prjEnvValues }] = useLazyQuery(
    ProjectByNameWithEnvVarsValueQuery,
    {
      variables: { name: project.name },
      onError: () => {
        setOpenPrjVars(false);
        setValueState(initValueState);
        setProjectErrorAlert(true);
      },
    }
  );

  if (prjEnvValues) {
    displayVars = prjEnvValues.project.envVariables;
  }

  if (prjError) console.error(prjError);

  const valuesShow = index => {
    setValueState(valueState => valueState.map((el, i) => (i === index ? true : el)));
  };

  const valuesHide = index => {
    setValueState(valueState => valueState.map((el, i) => (i === index ? false : el)));
  };

  const showVarValue = () => {
    getPrjEnvVarValues();
    setOpenPrjVars(!openPrjVars);
    setValueState(initValueState);
    setAction('view');
  };

  const setUpdateValue = (rowValue, rowName, rowScope) => {
    setUpdateVarValue(rowValue);
    setUpdateVarName(rowName);
    setUpdateVarScope(rowScope);
  };

  const permissionCheck = (action, index = 0) => {
    setOpenPrjVars(false);
    setAction(action);
    valuesShow(index);
    getPrjEnvVarValues();
  };

  return (
    <StyledProjectVariablesDetails className="details">
      {displayVars.length === 0 ? (
        <>
          {projectErrorAlert && (
            <Alert
              type="error"
              closeAlert={closeProjectError}
              header="Unauthorized:"
              message={`You don't have permission to ${action} project ${
                action === 'view' ? ' variable values' : 'variables'
              }. Contact your administrator to obtain the relevant permissions.`}
            />
          )}
          <div className="header no-vars">
            <Button onClick={() => permissionCheck('add')} style={{ all: 'unset' }}>
              {prjLoading && action === 'add' ? (
                <Button className="add-variable">
                  <LoadingOutlined />
                </Button>
              ) : (
                <AddVariable
                  varProject={project.name}
                  varValues={displayVars}
                  varTarget="Project"
                  refresh={onVariableAdded}
                  noVars="Add"
                  setProjectErrorAlert={setProjectErrorAlert}
                  action="add"
                />
              )}
            </Button>
          </div>
          <hr style={{ margin: '30px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <label>No Project variables set</label>
          </div>
          <hr style={{ margin: '30px 0' }} />
        </>
      ) : (
        <>
          {projectErrorAlert && (
            <Alert
              type="error"
              closeAlert={closeProjectError}
              header="Unauthorized:"
              message={`You don't have permission to ${action} project ${
                action === 'view' ? ' variable values' : 'variables'
              }. Contact your administrator to obtain the relevant permissions.`}
            />
          )}
          <div className="header">
            <label>Project Variables</label>
            <div className="header-buttons">
              <Button data-cy="addVariable" onClick={() => permissionCheck('add')} style={{ all: 'unset' }}>
                {prjLoading && action === 'add' ? (
                  <Button className="add-variable">
                    <LoadingOutlined />
                  </Button>
                ) : (
                  <AddVariable
                    varProject={project.name}
                    varValues={displayVars}
                    varTarget="Project"
                    refresh={onVariableAdded}
                    action="add"
                  />
                )}
              </Button>
              <Button
                onClick={() => showVarValue()}
                aria-controls="example-collapse-text"
                aria-expanded={openPrjVars}
                data-cy="hideShowValues"
              >
                {!openPrjVars ? 'Show values' : 'Hide values'}
              </Button>
            </div>
          </div>
          <div className="field-wrapper env-vars">
            <StyledProjectVariableTable>
              <div className={openPrjVars ? 'values-present table-header' : 'table-header'}>
                <div className="name">
                  <label>Name</label>
                </div>
                <div className="scope">
                  <label>Scope</label>
                </div>
                <Collapse in={openPrjVars}>
                  <div className="value">
                    <label>Value</label>
                  </div>
                </Collapse>
              </div>
              <div className="data-table" data-cy="environment-table">
                {displayVars.map((projEnvVar, index) => {
                  return (
                    <Fragment key={index}>
                      <div className={openPrjVars ? 'values-present data-row' : 'data-row'} data-cy="environment-row">
                        <div className="varName">{projEnvVar.name}</div>
                        <div className="varScope">{projEnvVar.scope}</div>
                        {prjLoading ? (
                          <Collapse in={openPrjVars}>
                            <div className="varValue" id={index}>
                              <div className="loader"></div>
                            </div>
                          </Collapse>
                        ) : projEnvVar.value !== undefined ? (
                          <Collapse in={openPrjVars}>
                            <div className="varValue" id={index}>
                              {projEnvVar.value.length === 0 && valueState[index] ? (
                                <div className="showHideContainer">
                                  <Tag color="#4578e6">Empty</Tag>
                                  <span onClick={() => valuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      data-cy="showhide-toggle"
                                      style={{ all: 'unset' }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length <= 100 && !valueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(projEnvVar.value).substring(0, 25)}
                                  <span onClick={() => valuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      data-cy="showhide-toggle"
                                      style={{ all: 'unset' }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length <= 100 && valueState[index] ? (
                                <div className="showHideContainer">
                                  {projEnvVar.value}
                                  <span onClick={() => valuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      data-cy="showhide-toggle"
                                      style={{ all: 'unset' }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length >= 100 && !valueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(projEnvVar.value).substring(0, 25)}
                                  <span onClick={() => valuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      data-cy="showhide-toggle"
                                      style={{ all: 'unset' }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length >= 100 && valueState[index] ? (
                                <div className="showHideContainer">
                                  ${projEnvVar.value.substring(0, 25)}..
                                  <span onClick={() => valuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      data-cy="showhide-toggle"
                                      style={{ all: 'unset' }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : (
                                `${hashValue(projEnvVar.value).substring(0, 25)}...`
                              )}
                              {projEnvVar.value.length > 100 ? (
                                <ViewVariableValue variableName={projEnvVar.name} variableValue={projEnvVar.value} />
                              ) : (
                                ''
                              )}
                            </div>
                          </Collapse>
                        ) : (
                          ''
                        )}
                        <div className="varActions">
                          <VariableActions>
                            <Collapse in={openPrjVars}>
                              <div className="varUpdate">
                                <Button
                                  onClick={() => setUpdateValue(projEnvVar.value, projEnvVar.name, projEnvVar.scope)}
                                  style={{ all: 'unset' }}
                                >
                                  <AddVariable
                                    varProject={project.name}
                                    varValues={displayVars}
                                    varTarget="Project"
                                    varName={updateVarName}
                                    varValue={updateVarValue}
                                    varScope={updateVarScope}
                                    refresh={onVariableAdded}
                                    icon="edit"
                                    action="edit"
                                  />
                                </Button>
                              </div>
                            </Collapse>
                            <div className="varDelete" data-cy="varDelete">
                              <Button onClick={() => permissionCheck('delete', index)} style={{ all: 'unset' }}>
                                {prjLoading && action === 'delete' ? (
                                  <DeleteVariableButton>
                                    <Btn
                                      index={index}
                                      variant="red"
                                      icon={!valueState[index] ? 'bin' : ''}
                                      className="delete-btn"
                                    >
                                      {valueState[index] ? <LoadingOutlined /> : 'Delete'}
                                    </Btn>
                                  </DeleteVariableButton>
                                ) : (
                                  <DeleteVariable
                                    deleteType="Project variable"
                                    deleteName={projEnvVar.name}
                                    varProject={project.name}
                                    icon="bin"
                                    refresh={onVariableAdded}
                                  />
                                )}
                              </Button>
                            </div>
                          </VariableActions>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </StyledProjectVariableTable>
          </div>
        </>
      )}
    </StyledProjectVariablesDetails>
  );
};

export default withLogic(ProjectVariables);
