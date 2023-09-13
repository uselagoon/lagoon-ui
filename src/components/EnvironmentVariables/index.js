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

const EnvironmentVariables = ({ environment, onVariableAdded, closeModal }) => {
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

  const [
    getEnvVarValues,
    { loading: envLoading, error: envError, data: envValues },
  ] = useLazyQuery(EnvironmentByProjectNameWithEnvVarsValueQuery, {
    variables: { openshiftProjectName: environment.openshiftProjectName },
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
  };

  const showPrjVarValue = () => {
    getPrjEnvVarValues();
    setOpenPrjVars(!openPrjVars);
    setPrjValueState(initProjectValueState);
  };

  const setUpdateValue = (rowValue, rowName, rowScope) => {
    setUpdateVarValue(rowValue);
    setUpdateVarName(rowName)
    setUpdateVarScope(rowScope)
  }

  return (
    <StyledEnvironmentVariableDetails className="details">
      {environment.envVariables.length == 0 ? (
        <>
          <div className="header no-vars">
            <AddVariable
              varProject={environment.project.name}
              varEnvironment={environment.name}
              varValues={displayVars}
              varTarget="Environment"
              noVars="Add"
              refresh={onVariableAdded}
            />
          </div>
          <hr style={{ margin: "30px 0" }} />
          <div style={{ textAlign: "center" }}>
            <label>No Environment variables set</label>
          </div>
        </>
      ) : (
        <>
          <div className="header">
            <label>Environment Variables</label>
            <div className="header-buttons">
              <Button
                  onClick={() => setOpenEnvVars(false)}
                  style={{ all: "unset" }}
              >
                <AddVariable
                  varProject={environment.project.name}
                  varEnvironment={environment.name}
                  varValues={displayVars}
                  varTarget="Environment"
                  refresh={onVariableAdded}
                />
              </Button>
              <Button
                onClick={() => showVarValue()}
                aria-controls="example-collapse-text"
                aria-expanded={openEnvVars}
              >
                {!openEnvVars ? "Show values" : "Hide values"}
              </Button>
            </div>
          </div>
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
                        {envLoading ? (
                          <Collapse in={openEnvVars}>
                            <div className="varValue" id={index}>
                              <div className="loader"></div>
                            </div>
                          </Collapse>
                        ) : envVar.value ? (
                          <Collapse in={openEnvVars}>
                            <div className="varValue" id={index}>
                              {envVar.value.length <= 100 &&
                              !valueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(envVar.value).substring(0, 25)}
                                  <span onClick={() => valuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : envVar.value.length <= 100 &&
                                valueState[index] ? (
                                <div className="showHideContainer">
                                  {envVar.value}
                                  <span onClick={() => valuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : envVar.value.length >= 100 &&
                                !valueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(envVar.value).substring(0, 25)}
                                  <span onClick={() => valuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : envVar.value.length >= 100 &&
                                valueState[index] ? (
                                <div className="showHideContainer">
                                  ${envVar.value.substring(0, 25)}..
                                  <span onClick={() => valuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : (
                                `${hashValue(envVar.value).substring(0, 25)}...`
                              )}
                              {envVar.value.length > 100 ? (
                                <ViewVariableValue
                                  variableName={envVar.name}
                                  variableValue={envVar.value}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </Collapse>
                        ) : (
                          <Collapse in={openEnvVars}>
                            <div className="varValue" id={index}>
                              Unauthorized: You don't have permission to view
                              this variable.
                            </div>
                          </Collapse>
                        )}
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
                                  />
                                </Button>
                              </div>
                            </Collapse>
                            <div className="varDelete">
                              <DeleteVariable
                                  deleteType="Environment variable"
                                  deleteName={envVar.name}
                                  varProject={environment.project.name}
                                  varEnvironment={environment.name}
                                  icon="bin"
                                  refresh={onVariableAdded}
                              />
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
        </>
      )}
      {displayProjectVars.length == 0 ? (
        <>
          <hr style={{ margin: "30px 0" }} />
          <div className="header no-vars">
            <Button>
              <ProjectVariablesLink
                projectSlug={environment.project.name}
                className="deployLink hover-state"
              >
                Add
              </ProjectVariablesLink>
            </Button>
          </div>
          <hr style={{ margin: "30px 0" }} />
          <div style={{ textAlign: "center" }}>
            <label>No Project variables set</label>
          </div>
          <hr style={{ margin: "30px 0" }} />
        </>
      ) : (
        <>
          <hr style={{ margin: "30px 0" }} />
          <div className="header">
            <label>Project Variables</label>
            <div className="header-buttons">
              <Button>
                <ProjectVariablesLink
                  projectSlug={environment.project.name}
                  className="deployLink hover-state"
                >
                  Edit
                </ProjectVariablesLink>
              </Button>
              <Button
                onClick={() => showPrjVarValue()}
                aria-controls="example-collapse-text"
                aria-expanded={openPrjVars}
              >
                {!openPrjVars ? "Show values" : "Hide values"}
              </Button>
            </div>
          </div>
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
                        {prjLoading ? (
                          <Collapse in={openPrjVars}>
                            <div className="varValue" id={index}>
                              <div className="loader"></div>
                            </div>
                          </Collapse>
                        ) : projEnvVar.value ? (
                          <Collapse in={openPrjVars}>
                            <div className="varValue" id={index}>
                              {projEnvVar.value.length <= 100 &&
                              !prjValueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(projEnvVar.value).substring(0, 25)}
                                  <span onClick={() => prjValuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length <= 100 &&
                                prjValueState[index] ? (
                                <div className="showHideContainer">
                                  {projEnvVar.value}
                                  <span onClick={() => prjValuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length >= 100 &&
                                !prjValueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(projEnvVar.value).substring(0, 25)}
                                  <span onClick={() => prjValuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length >= 100 &&
                                prjValueState[index] ? (
                                <div className="showHideContainer">
                                  ${projEnvVar.value.substring(0, 25)}..
                                  <span onClick={() => prjValuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : (
                                `${hashValue(projEnvVar.value).substring(
                                  0,
                                  25
                                )}...`
                              )}
                              {projEnvVar.value.length > 100 ? (
                                <ViewVariableValue
                                  variableName={projEnvVar.name}
                                  variableValue={projEnvVar.value}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </Collapse>
                        ) : (
                          <Collapse in={openPrjVars}>
                            <div className="varValue" id={index}>
                              Unauthorized: You don't have permission to view
                              this variable.
                            </div>
                          </Collapse>
                        )}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </StyledProjectVariableTable>
          </div>
        </>
      )}
    </StyledEnvironmentVariableDetails>
  );
};

export default withLogic(EnvironmentVariables);
