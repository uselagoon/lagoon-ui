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

import OrganizationByNameWithEnvVarsValueQuery from '../../../lib/query/organizations/OrganizationByNameWithEnvVarsValue';
import hide from '../../../static/images/hide.svg';
import show from '../../../static/images/show.svg';
import AddVariable from '../../AddVariable';
import { DeleteVariableButton } from '../../DeleteVariable/StyledDeleteVariable';
import ViewVariableValue from '../../ViewVariableValue';
import { StyledVariableTable, StyledVariablesDetails, VariableActions } from './StyledVariables';

/**
 * Displays the organization variable information.
 */

const hashValue = value => {
  let hashedVal = '●';
  for (let l = 0; l < value.length; l++) {
    hashedVal += '●';
  }
  return hashedVal;
};

const OrganizationVariables = ({ organization, onVariableAdded }) => {
  let displayVars = organization.envVariables;
  let initValueState = new Array(displayVars.length).fill(false);

  const [valueState, setValueState] = useState(initValueState);
  const [openOrgVars, setOpenOrgVars] = useState(false);
  const [updateVarValue, setUpdateVarValue] = useState('');
  const [updateVarName, setUpdateVarName] = useState('');
  const [updateVarScope, setUpdateVarScope] = useState('');
  const [orgErrorAlert, setOrgErrorAlert] = useState(false);
  const [action, setAction] = useState('');

  const closeOrgError = () => {
    setOrgErrorAlert(false);
  };

  const [getOrgEnvVarValues, { loading: orgLoading, error: orgError, data: orgEnvValues }] = useLazyQuery(
    OrganizationByNameWithEnvVarsValueQuery,
    {
      variables: { name: organization.name },
      onError: () => {
        setOpenOrgVars(false);
        setValueState(initValueState);
        setOrgErrorAlert(true);
      },
    }
  );

  if (orgEnvValues) {
    displayVars = orgEnvValues.organization.envVariables;
  }

  if (orgError) console.error(orgError);

  const valuesShow = index => {
    setValueState(valueState => valueState.map((el, i) => (i === index ? true : el)));
  };

  const valuesHide = index => {
    setValueState(valueState => valueState.map((el, i) => (i === index ? false : el)));
  };

  const showVarValue = () => {
    getOrgEnvVarValues();
    setOpenOrgVars(!openOrgVars);
    setValueState(initValueState);
    setAction('view');
  };

  const setUpdateValue = (rowValue, rowName, rowScope) => {
    setUpdateVarValue(rowValue);
    setUpdateVarName(rowName);
    setUpdateVarScope(rowScope);
  };

  const permissionCheck = (action, index = null) => {
    getOrgEnvVarValues();
    setOpenOrgVars(false);
    setAction(action);
    if (action === 'delete') {
      valuesShow(index);
    }
  };

  const renderValue = (orgEnvVar, index) => {
    if (orgEnvVar.value.length >= 0 && !valueState[index]) {
      return hashValue(orgEnvVar.value).substring(0, 25);
    } else if (orgEnvVar.value.length >= 100 && valueState[index]) {
      return orgEnvVar.value.substring(0, 25) + '..';
    } else if (orgEnvVar.value.length === 0 && valueState[index]) {
      return <Tag color="#4578e6">Empty</Tag>;
    } else {
      return orgEnvVar.value;
    }
  };

  const renderValues = (orgEnvVar, index) => {
    if (orgEnvVar.value !== undefined) {
      return (
        <Collapse in={openOrgVars}>
          <div className="varValue" id={index}>
            <div className="showHideContainer">
              {renderValue(orgEnvVar, index)}
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
            {orgEnvVar.value.length >= 100 && valueState[index] && (
              <ViewVariableValue variableName={orgEnvVar.name} variableValue={orgEnvVar.value} />
            )}
          </div>
        </Collapse>
      );
    }
  };

  return (
    <StyledVariablesDetails className="details">
      <>
        {orgErrorAlert && (
          <Alert
            type="error"
            closeAlert={closeOrgError}
            header="Unauthorized:"
            message={`You don't have permission to ${action} organization ${
              action === 'view' ? ' variable values' : 'variables'
            }. Contact your administrator to obtain the relevant permissions.`}
          />
        )}
        <div className="header">
          <label>Organization Variables</label>
          <div className="header-buttons">
            <Button data-cy="addVariable" onClick={() => permissionCheck('add')} style={{ all: 'unset' }}>
              {orgErrorAlert ? (
                <Button className="add-variable">Add</Button>
              ) : (
                <AddVariable
                  varOrganization={organization.name}
                  varValues={displayVars}
                  varTarget="Organization"
                  refresh={onVariableAdded}
                  setOrganizationErrorAlert={setOrgErrorAlert}
                  action="add"
                  loading={orgLoading && action === 'add'}
                  orgEnvValues={orgEnvValues}
                />
              )}
            </Button>

            {displayVars.length > 0 && (
              <Button
                onClick={() => showVarValue()}
                aria-controls="example-collapse-text"
                aria-expanded={openOrgVars}
                data-cy="hideShowValues"
                className="show-value-btn"
              >
                {!openOrgVars ? 'Show values' : orgLoading ? <LoadingOutlined /> : 'Hide values'}
              </Button>
            )}
          </div>
        </div>
        {!displayVars.length && (
          <>
            <hr style={{ margin: '30px 0' }} />
            <div style={{ textAlign: 'center' }}>
              <label>No Organization variables set</label>
            </div>
            <hr style={{ margin: '30px 0' }} />
          </>
        )}
        {displayVars.length > 0 && (
          <div className="field-wrapper env-vars">
            <StyledVariableTable>
              <div className={!orgLoading && openOrgVars ? 'values-present table-header' : 'table-header'}>
                <div className="name">
                  <label>Name</label>
                </div>
                <div className="scope">
                  <label>Scope</label>
                </div>
                {!orgLoading && (
                  <Collapse in={openOrgVars}>
                    <div className="value">
                      <label>Value</label>
                    </div>
                  </Collapse>
                )}
              </div>
              <div className="data-table" data-cy="environment-table">
                {displayVars.map((orgEnvVar, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className={!orgLoading && openOrgVars ? 'values-present data-row' : 'data-row'}
                        data-cy="environment-row"
                      >
                        <div className="varName">{orgEnvVar.name}</div>
                        <div className="varScope">{orgEnvVar.scope}</div>
                        {renderValues(orgEnvVar, index)}
                        <div className="varActions">
                          <VariableActions>
                            {!orgLoading && (
                              <Collapse in={openOrgVars}>
                                <div className="varUpdate">
                                  <Tooltip
                                    overlayClassName="componentTooltip"
                                    title="Update Variable"
                                    placement="bottom"
                                  >
                                    <Button
                                      onClick={() => setUpdateValue(orgEnvVar.value, orgEnvVar.name, orgEnvVar.scope)}
                                      style={{ all: 'unset' }}
                                    >
                                      <AddVariable
                                        varOrganization={organization.name}
                                        varValues={displayVars}
                                        varTarget="Organization"
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
                            <div className="varDelete" data-cy="varDelete">
                              <Tooltip overlayClassName="componentTooltip" title="Delete Variable" placement="bottom">
                                <Button onClick={() => permissionCheck('delete', index)} style={{ all: 'unset' }}>
                                  {orgErrorAlert ? (
                                    <DeleteVariableButton>
                                      <Btn index={index} variant="red" icon="bin" className="delete-btn"></Btn>
                                    </DeleteVariableButton>
                                  ) : (
                                    <DeleteVariable
                                      deleteType="Organization variable"
                                      deleteName={orgEnvVar.name}
                                      varOrganization={organization.name}
                                      icon="bin"
                                      refresh={onVariableAdded}
                                      envValues={orgEnvValues}
                                      loading={orgLoading && action === 'delete'}
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
    </StyledVariablesDetails>
  );
};

export default withLogic(OrganizationVariables);
