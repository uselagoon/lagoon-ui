import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EnvironmentProjectByProjectNameWithEnvVarsValueQuery from "../../lib/query/EnvironmentAndProjectByOpenshiftProjectNameWithEnvVarsValue";
import EnvironmentByProjectNameWithEnvVarsValueQuery from "../../lib/query/EnvironmentByOpenshiftProjectNameWithEnvVarsValue";
import { useLazyQuery } from "@apollo/react-hooks";
import DeleteVariable from "components/DeleteVariable";
import AddVariable from "../AddVariable";
import ViewVariableValue from "../ViewVariableValue";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import withLogic from 'components/DeleteConfirm/logic';
import {
  StyledEnvironmentVariableDetails,
  StyledProjectVariableTable,
  StyledVariableTable,
  VariableActions,
} from "./StyledEnvironmentVariables";
import Image from "next/image";
import show from "../../static/images/show.svg";
import hide from "../../static/images/hide.svg";
import ProjectVariablesLink from "components/link/ProjectVariables";
import Alert from 'components/Alert'
import {Tag} from "antd";
import Btn from 'components/Button'
import {DeleteVariableButton} from "../DeleteVariable/StyledDeleteVariable";
import {LoadingOutlined} from "@ant-design/icons";

/**
 * Displays the environment variable information.
 */

const hashValue = (value) => {
  let hashedVal = "●";
  for (let l = 0; l < value.length; l++) {
    hashedVal += "●";
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
  const [updateVarValue, setUpdateVarValue ] = useState('');
  const [updateVarName, setUpdateVarName ] = useState('');
  const [updateVarScope, setUpdateVarScope ] = useState('');
  const [environmentErrorAlert, setEnvironmentErrorAlert] = useState(false);
  const [projectErrorAlert, setProjectErrorAlert] = useState(false);
  const [action, setAction] = useState('');

  const closeEnvironmentError = () => {
    setEnvironmentErrorAlert(false);
  };

  const closeProjectError = () => {
    setProjectErrorAlert(false);
  };

  const [
    getEnvVarValues,
    { loading: envLoading, error: envError, data: envValues },
  ] = useLazyQuery(EnvironmentByProjectNameWithEnvVarsValueQuery, {
    variables: { openshiftProjectName: environment.openshiftProjectName },
    onError: () => {
      setOpenEnvVars(false);
      setValueState(initValueState);
      setEnvironmentErrorAlert(true);
    }
  });

  if (envValues) {
    displayVars = envValues.environmentVars.envVariables;
  }

  if (envError) console.error(envError);

  const [
    getPrjEnvVarValues,
    { loading: prjLoading, error: prjError, data: prjEnvValues },
  ] = useLazyQuery(EnvironmentProjectByProjectNameWithEnvVarsValueQuery, {
    variables: { openshiftProjectName: environment.openshiftProjectName },
    onError: () => {
      setOpenPrjVars(!openPrjVars);
      setProjectErrorAlert(true);
    }
  });

  if (prjEnvValues) {
    displayProjectVars = prjEnvValues.environmentVars.project.envVariables;
  }

  if (prjError) console.error(prjError);

  const valuesShow = (index) => {
    setValueState((valueState) =>
      valueState.map((el, i) => (i === index ? true : el))
    );
  };
  const valuesHide = (index) => {
    setValueState((valueState) =>
      valueState.map((el, i) => (i === index ? false : el))
    );
  };
  const prjValuesShow = (index) => {
    setPrjValueState((prjValueState) =>
      prjValueState.map((el, i) => (i === index ? true : el))
    );
  };
  const prjValuesHide = (index) => {
    setPrjValueState((prjValueState) =>
      prjValueState.map((el, i) => (i === index ? false : el))
    );
  };

  const showVarValue = () => {
    getEnvVarValues();
    setOpenEnvVars(!openEnvVars);
    setValueState(initValueState);
    setAction("view")
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
  }

  const permissionCheck = (action) => {
    getEnvVarValues();
    setOpenEnvVars(false);
    setAction(action);
  }

  const renderEnvValue = (envVar, index) => {
    if (envVar.value.length >= 0 && !valueState[index]) {
      return hashValue(envVar.value).substring(0, 25)
    } else if (envVar.value.length >= 100 && valueState[index]) {
      return envVar.value.substring(0, 25) + ".."
    } else if (envVar.value.length === 0 && valueState[index]) {
      return <Tag color="#4578e6">Empty</Tag>
    } else {
      return envVar.value
    }
  }

  const renderPrjValue = (projEnvVar, index) => {
    if (projEnvVar.value.length >= 0 && !prjValueState[index]) {
      return hashValue(projEnvVar.value).substring(0, 25)
    } else if (projEnvVar.value.length >= 100 && prjValueState[index]) {
      return projEnvVar.value.substring(0, 25) + ".."
    } else if (projEnvVar.value.length === 0 && prjValueState[index]) {
      return <Tag color="#4578e6">Empty</Tag>
    } else {
      return projEnvVar.value
    }
  }

  const renderEnvValues = (envVar, index) => {
    if (envLoading) {
      return (
        <div className="loader"></div>
      )
    }

    if (envVar.value !== undefined) {
      return (
        <Collapse in={openEnvVars}>
          <div className="varValue" id={index}>
            <div className="showHideContainer">
              {renderEnvValue(envVar, index)}
              <span onClick={ !valueState[index] ? () => valuesShow(index) : () => valuesHide(index)}>
              <Image
                src={!valueState[index] ? show : hide}
                className="showHide"
                style={{ all: "unset" }}
                alt=""
              />
            </span>
            </div>
            { envVar.value.length >= 100 && valueState[index] && (
              <ViewVariableValue variableName={envVar.name} variableValue={envVar.value} />
            )}
          </div>
        </Collapse>
      )
    }
  }

  const renderPrjValues = (projEnvVar, index) => {
    if (prjLoading) {
      return (
        <div className="loader"></div>
      )
    }

    if (projEnvVar.value !== undefined) {
      return (
        <Collapse in={openPrjVars}>
          <div className="varValue" id={index}>
            <div className="showHideContainer">
              {renderPrjValue(projEnvVar, index)}
              <span onClick={ !prjValueState[index] ? () => prjValuesShow(index) : () => prjValuesHide(index)}>
              <Image
                src={!prjValueState[index] ? show : hide}
                className="showHide"
                style={{ all: "unset" }}
                alt=""
              />
            </span>
            </div>
            { projEnvVar.value.length >= 100 && prjValueState[index] && (
              <ViewVariableValue variableName={projEnvVar.name} variableValue={projEnvVar.value} />
            )}
          </div>
        </Collapse>
      )
    }
  }

  return (
    <StyledEnvironmentVariableDetails className="details">
      <>
        {environmentErrorAlert && (
          <Alert
            type="error"
            closeAlert={closeEnvironmentError}
            header="Unauthorized:"
            message={`You don't have permission to ${action} environment ${action === "view" ? " variable values" : "variables"}. Contact your administrator to obtain the relevant permissions.`}
          />
          )}
        <div className="header">
          <label>Project Variables</label>
          <div className="header-buttons">
          <Button
            onClick={() => permissionCheck("add")}
            style={{ all: "unset" }}
          >
            {projectErrorAlert ? <Button className="add-variable">Add</Button> :
              <AddVariable
                varProject={environment.project.name}
                varEnvironment={environment.name}
                varValues={displayVars}
                varTarget="Environment"
                noVars="Add"
                refresh={onVariableAdded}
                setEnvironmentErrorAlert={setEnvironmentErrorAlert}
                action="add"
                loading={prjLoading && action === "add"}
                envValues={envValues}
              />
            }
          </Button>
            { displayVars.length > 0 && (
              <Button
                  onClick={() => showVarValue()}
                  aria-controls="example-collapse-text"
                  aria-expanded={openPrjVars}
              >
                {!openEnvVars ? "Show values" : "Hide values"}
              </Button>
            )}
          </div>
        </div>
        { !displayVars.length && (
          <>
            <hr style={{ margin: "30px 0" }} />
            <div style={{ textAlign: "center" }}>
              <label>No Environment variables set</label>
            </div>
            <hr style={{ margin: "30px 0" }} />
          </>
        )}
        { displayVars.length > 0 && (
        <div className="field-wrapper env-vars">
          <StyledVariableTable>
            <div
              className={
                openEnvVars ? "values-present table-header" : "table-header"
              }
            >
              <div className="name">
                <label>Name</label>
              </div>
              <div className="scope">
                <label>Scope</label>
              </div>
              <Collapse in={openEnvVars}>
                <div className="value">
                  <label>Value</label>
                </div>
              </Collapse>
            </div>
            <div className="data-table">
              {displayVars.map((envVar, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={
                        openEnvVars ? "values-present data-row" : "data-row"
                      }
                    >
                      <div className="varName">{envVar.name}</div>
                      <div className="varScope">{envVar.scope}</div>
                      {renderEnvValues(envVar, index)}
                      <div className="varActions">
                        <VariableActions>
                          <Collapse in={openEnvVars}>
                            <div className="varUpdate">
                              <Button
                                onClick={() => setUpdateValue(envVar.value, envVar.name, envVar.scope)}
                                style={{ all: 'unset'}}
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
                            </div>
                          </Collapse>
                          <div className="varDelete">
                            <Button
                              onClick={() => permissionCheck("delete", index)}
                              style={{ all: "unset" }}
                            >
                              {envLoading && action === "delete" ?
                                <DeleteVariableButton>
                                  <Btn index={index} variant='red' icon={!valueState[index] ? 'bin': ''} className="delete-btn">
                                    {valueState[index] ? <LoadingOutlined/> : "Delete"}
                                  </Btn>
                                </DeleteVariableButton>
                              :
                                <DeleteVariable
                                  deleteType="Environment variable"
                                  deleteName={envVar.name}
                                  varProject={environment.project.name}
                                  varEnvironment={environment.name}
                                  icon="bin"
                                  refresh={onVariableAdded}
                                />
                              }
                            </Button>
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
      {
        displayVars.length !== 0 ? <hr style={{ margin: "30px 0" }} /> : ''
      }

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
            <Button>
              <ProjectVariablesLink
                projectSlug={environment.project.name}
                className="deployLink hover-state"
              >
                { displayProjectVars.length !== 0 ? "Edit" : "Add" }
              </ProjectVariablesLink>
            </Button>

            { displayProjectVars.length > 0 && (
            <Button
              onClick={() => showPrjVarValue()}
              aria-controls="example-collapse-text"
              aria-expanded={openPrjVars}
            >
              {!openPrjVars ? "Show values" : "Hide values"}
            </Button>
            )}
          </div>
        </div>
        { !displayProjectVars.length && (
          <>
            <hr style={{ margin: "30px 0" }} />
            <div style={{ textAlign: "center" }}>
              <label>No Project variables set</label>
            </div>
            <hr style={{ margin: "30px 0" }} />
          </>
        )}
    { displayProjectVars.length > 0 && (
      <div className="field-wrapper env-vars">
        <StyledProjectVariableTable>
          <div
            className={
              openPrjVars ? "values-present table-header" : "table-header"
            }
          >
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
          <div className="data-table">
            {displayProjectVars.map((projEnvVar, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className={
                      openPrjVars ? "values-present data-row" : "data-row"
                    }
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
