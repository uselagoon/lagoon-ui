import React, { Fragment, useState } from "react";
import { Mutation } from "react-apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteEnvVariableMutation from "../../lib/mutation/deleteEnvVariableByName";
import EnvironmentByProjectNameWithEnvVarsValueQuery from "../../lib/query/EnvironmentByOpenshiftProjectNameWithEnvVarsValue";
import { useLazyQuery } from "@apollo/react-hooks";
import DeleteConfirm from "components/DeleteConfirm";
import AddEnvironmentVariable from "../AddEnvironmentVariable";
import ViewVariableValue from "../ViewVariableValue";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { bp, color } from "lib/variables";

/**
 * Displays the environment variable information.
 */

const hashValue = (value) => {
  let hashedVal = "#";
  for (let l = 0; l < value.length; l++) {
    hashedVal += "#";
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

  const [getEnvVarValues, { error, data: envValues }] = useLazyQuery(
    EnvironmentByProjectNameWithEnvVarsValueQuery,
    {
      variables: { openshiftProjectName: environment.openshiftProjectName },
    }
  );
  if (envValues) {
    displayVars = envValues.environmentVars.envVariables;
    displayProjectVars = envValues.environmentVars.project.envVariables;
  }
  if (error) console.log(error);

  const valuesShow = (index) => {
    setValueState((valueState) =>
      valueState.map((el, i) => (i === index ? true : el))
    );
  };
  const prjValuesShow = (index) => {
    setprjValueState((prjValueState) =>
      prjValueState.map((el, i) => (i === index ? true : el))
    );
  };

  const showVarValue = (env) => {
    getEnvVarValues();
    if (env == "EnvVars") {
      setOpenEnvVars(!openEnvVars);
      setValueState(initValueState);
    }
    if (env == "PrjVars") {
      setOpenPrjVars(!openPrjVars);
      setprjValueState(initProjectValueState);
    }
  };

  return (
    <div className="details">
      <AddEnvironmentVariable
        varProject={environment.project.name}
        varEnvironment={environment.name}
        varValues={displayVars}
      />
      <div className="field-wrapper env-vars">
        {environment.envVariables.length == 0 ? (
          <>
            <hr style={{ margin: "30px 0" }} />
            <div style={{ textAlign: "center" }}>
              No Environment variable set
            </div>
          </>
        ) : (
          <>
            <div className="header">
              <label>Environment Variables</label>
              <Button
                onClick={() => showVarValue("EnvVars")}
                aria-controls="example-collapse-text"
                aria-expanded={openEnvVars}
              >
                {!openEnvVars ? "Show values" : "Hide values"}
              </Button>
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
                        {envVar.value ? (
                          <Collapse in={openEnvVars}>
                            <td className="varValue" id={index}>
                              {envVar.value.length <= 100 &&
                              !valueState[index] ? (
                                <a href="#" onClick={() => valuesShow(index)}>
                                  {hashValue(envVar.value)}
                                </a>
                              ) : envVar.value.length <= 100 &&
                                valueState[index] ? (
                                <a>{envVar.value}</a>
                              ) : envVar.value.length >= 100 &&
                                !valueState[index] ? (
                                <a href="#" onClick={() => valuesShow(index)}>
                                  {hashValue(envVar.value).substring(0, 50)}...
                                </a>
                              ) : envVar.value.length >= 100 &&
                                valueState[index] ? (
                                <a href="#" onClick={() => valuesShow(index)}>
                                  {envVar.value.substring(0, 50)}...
                                </a>
                              ) : (
                                `${hashValue(envVar.value).substring(0, 50)}...`
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
                                return <div>{error.message}</div>;
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
                                }, "2000");
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
        </>
      ) : (
        <>
          <hr style={{ margin: "30px 0" }} />
          <div className="header">
            <label>Project Variables</label>
            <Button
              onClick={() => showVarValue("PrjVars")}
              aria-controls="example-collapse-text"
              aria-expanded={openPrjVars}
            >
              {!openPrjVars ? "Show values" : "Hide values"}
            </Button>
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
                        {projEnvVar.value ? (
                          <Collapse in={openPrjVars}>
                            <td className="varValue" id={index}>
                              {projEnvVar.value.length <= 100 &&
                              !prjValueState[index] ? (
                                <a
                                  href="#"
                                  onClick={() => prjValuesShow(index)}
                                >
                                  {hashValue(projEnvVar.value)}
                                </a>
                              ) : projEnvVar.value.length <= 100 &&
                                prjValueState[index] ? (
                                <a>{projEnvVar.value}</a>
                              ) : projEnvVar.value.length >= 100 &&
                                !prjValueState[index] ? (
                                <a
                                  href="#"
                                  onClick={() => prjValuesShow(index)}
                                >
                                  {hashValue(projEnvVar.value).substring(0, 50)}
                                  ...
                                </a>
                              ) : projEnvVar.value.length >= 100 &&
                                prjValueState[index] ? (
                                <a
                                  href="#"
                                  onClick={() => prjValuesShow(index)}
                                >
                                  {projEnvVar.value.substring(0, 50)}...
                                </a>
                              ) : (
                                `${hashValue(projEnvVar.value).substring(
                                  0,
                                  50
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
      <style jsx>{`
        .env-vars {
          width: 100%;
          display: block;
          margin-top: 16px;
        }
        tr,
        th {
          text-align: center;
          vertical-align: middle;
        }
        tr {
          height: 57px;
          max-height: 57px;
        }
        .varName,
        .varScope {
          max-width: 20%;
          width: 20%;
        }
        .varValue {
          max-width: 40%;
          width: 40%;
        }
        .varDelete {
          max-width: 10%;
          width: 10%;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin: 16px 0;
        }
        .details {
          padding: 32px calc((100vw / 16) * 1);
          width: 100%;
          @media ${bp.xs_smallUp} {
            min-width: 100%;
            padding-left: calc(((100vw / 16) * 1.5) + 28px);
            padding-top: 48px;
            width: 100%;
          }
          @media ${bp.tabletUp} {
            padding: 48px calc((100vw / 16) * 1) 48px
              calc(((100vw / 16) * 1.5) + 28px);
          }
          @media ${bp.extraWideUp} {
            padding-left: calc(((100vw / 16) * 1) + 28px);
          }

          .field-wrapper {
            &::before {
              left: calc(((-100vw / 16) * 1.5) - 28px);
            }
            @media ${bp.xs_smallUp} {
              min-width: 50%;
              position: relative;
              width: 50%;
            }
            @media ${bp.wideUp} {
              min-width: 33.33%;
              width: 33.33%;
            }
            @media ${bp.extraWideUp} {
              min-width: 25%;
              width: 25%;
            }

            &.env-vars {
              width: 100%;
            }

            &.source {
              width: 100%;

              &::before {
                background-image: url("/static/images/git-lab.svg");
                background-size: 19px 17px;
              }

              .field {
                color: ${color.linkBlue};
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            & > div {
              width: 100%;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default EnvironmentVariables;
