import React, { Fragment, useState } from "react";
import { Mutation } from "react-apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteEnvVariableMutation from "../../lib/mutation/deleteEnvVariableByName";
import EnvironmentProjectByProjectNameWithEnvVarsValueQuery from "../../lib/query/EnvironmentAndProjectByOpenshiftProjectNameWithEnvVarsValue";
import EnvironmentByProjectNameWithEnvVarsValueQuery from "../../lib/query/EnvironmentByOpenshiftProjectNameWithEnvVarsValue";
import { useLazyQuery } from "@apollo/react-hooks";
import DeleteConfirm from "components/DeleteConfirm";
import AddVariable from "../AddVariable";
import ViewVariableValue from "../ViewVariableValue";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { StyledEnvironmentVariableDetails } from "./StyledEnvironmentVariables";
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

const EnvironmentVariables = ({ environment }) => {
  let displayVars = environment.envVariables;
  let displayProjectVars = environment.project.envVariables;
  let initValueState = new Array(displayVars.length).fill(false);
  let initProjectValueState = new Array(displayProjectVars.length).fill(false);

  const [valueState, setValueState] = useState(initValueState);
  const [prjValueState, setprjValueState] = useState(initProjectValueState);
  const [openEnvVars, setOpenEnvVars] = useState(false);
  const [openPrjVars, setOpenPrjVars] = useState(false);

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
    setprjValueState((prjValueState) =>
      prjValueState.map((el, i) => (i === index ? true : el))
    );
  };
  const prjValuesHide = (index) => {
    setprjValueState((prjValueState) =>
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
    setprjValueState(initProjectValueState);
  };

  return (
    <StyledEnvironmentVariableDetails className="details">
      <div className="field-wrapper env-vars">
        {environment.envVariables.length == 0 ? (
          <>
            <div className="header no-vars">
              <AddVariable
                varProject={environment.project.name}
                varEnvironment={environment.name}
                varValues={displayVars}
                varTarget="Environment"
              />
            </div>
            <hr style={{ margin: "30px 0" }} />
            <div style={{ textAlign: "center" }}>
              No Environment variable set
            </div>
          </>
        ) : (
          <>
            <div className="header">
              <label>Environment Variables</label>
              <div className="header-buttons">
                <AddVariable
                  varProject={environment.project.name}
                  varEnvironment={environment.name}
                  varValues={displayVars}
                  varTarget="Environment"
                />
                <Button
                  onClick={() => showVarValue()}
                  aria-controls="example-collapse-text"
                  aria-expanded={openEnvVars}
                >
                  {!openEnvVars ? "Show values" : "Hide values"}
                </Button>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Environment Variable Name</th>
                  <th>Environment Variable Scope</th>
                  <Collapse in={openEnvVars}>
                    <th>Value</th>
                  </Collapse>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {displayVars.map((envVar, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td className="varName">{envVar.name}</td>
                        <td className="varScope">{envVar.scope}</td>
                        {envLoading ? (
                          <Collapse in={openEnvVars}>
                            <td className="varValue" id={index}>
                              <div className="loader"></div>
                            </td>
                          </Collapse>
                        ) : envVar.value ? (
                          <Collapse in={openEnvVars}>
                            <td className="varValue" id={index}>
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
                            </td>
                          </Collapse>
                        ) : (
                          <Collapse in={openEnvVars}>
                            <td className="varValue" id={index}>
                              Unauthorized: You don't have permission to view
                              this variable.
                            </td>
                          </Collapse>
                        )}
                        <td className="varDelete">
                          <Mutation mutation={DeleteEnvVariableMutation}>
                            {(
                              deleteEnvVariableByName,
                              { loading, called, error, data }
                            ) => {
                              if (error) {
                                console.error(error);
                                return (
                                  <div>
                                    Unauthorized: You don't have permission to
                                    delete this variable.
                                  </div>
                                );
                              }

                              if (called) {
                                return <div>Delete queued</div>;
                              }

                              const deleteEnvVariableByNameHandler = () => {
                                deleteEnvVariableByName({
                                  variables: {
                                    input: {
                                      name: envVar.name,
                                      project: environment.project.name,
                                      environment: environment.name,
                                    },
                                  },
                                });
                                setTimeout(() => {
                                  location.reload();
                                }, 2000);
                              };

                              return (
                                <DeleteConfirm
                                  deleteType="variable"
                                  deleteName={envVar.name}
                                  onDelete={() =>
                                    deleteEnvVariableByNameHandler()
                                  }
                                />
                              );
                            }}
                          </Mutation>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </div>
      {displayProjectVars.length == 0 ? (
        <>
          <hr style={{ margin: "30px 0" }} />
          <div style={{ textAlign: "center" }}>No Project variable set</div>
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project Variable Name</th>
                  <th>Project Variable Scope</th>
                  <Collapse in={openPrjVars}>
                    <th>Value</th>
                  </Collapse>
                </tr>
              </thead>
              <tbody>
                {displayProjectVars.map((projEnvVar, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td className="varName">{projEnvVar.name}</td>
                        <td className="varScope">{projEnvVar.scope}</td>
                        {prjLoading ? (
                          <Collapse in={openPrjVars}>
                            <td className="varValue" id={index}>
                              <div className="loader"></div>
                            </td>
                          </Collapse>
                        ) : projEnvVar.value ? (
                          <Collapse in={openPrjVars}>
                            <td className="varValue" id={index}>
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
                            </td>
                          </Collapse>
                        ) : (
                          <Collapse in={openPrjVars}>
                            <td className="varValue" id={index}>
                              Unauthorized: You don't have permission to view
                              this variable.
                            </td>
                          </Collapse>
                        )}
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </StyledEnvironmentVariableDetails>
  );
};

export default EnvironmentVariables;
