import React, { Fragment, useState } from "react";
import { Mutation } from "react-apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteEnvVariableMutation from "../../lib/mutation/deleteEnvVariableByName";
import ProjectByNameWithEnvVarsValueQuery from "../../lib/query/ProjectByNameWithEnvVarsValue";
import { useLazyQuery } from "@apollo/react-hooks";
import DeleteConfirm from "components/DeleteConfirm";
import AddVariable from "../AddVariable";
import ViewVariableValue from "../ViewVariableValue";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Image from "next/image";
import show from "../../static/images/show.svg";
import hide from "../../static/images/hide.svg";
import deleteVariable from "../../static/images/delete.svg";
import {
  StyledProjectVariablesDetails,
  StyledProjectVariableTable,
} from "./StyledProjectVariables";

/**
 * Displays the projects variable information.
 */

const hashValue = (value) => {
  let hashedVal = "●";
  for (let l = 0; l < value.length; l++) {
    hashedVal += "●";
  }
  return hashedVal;
};

const ProjectVariables = ({ project }) => {
  let displayVars = project.envVariables;
  let initValueState = new Array(displayVars.length).fill(false);

  const [valueState, setValueState] = useState(initValueState);
  const [openPrjVars, setOpenPrjVars] = useState(false);

  const [
    getPrjEnvVarValues,
    { loading: prjLoading, error: prjError, data: prjEnvValues },
  ] = useLazyQuery(ProjectByNameWithEnvVarsValueQuery, {
    variables: { name: project.name },
  });

  if (prjEnvValues) {
    displayVars = prjEnvValues.project.envVariables;
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

  const showVarValue = () => {
    getPrjEnvVarValues();
    setOpenPrjVars(!openPrjVars);
    setValueState(initValueState);
  };

  return (
    <StyledProjectVariablesDetails className="details">
      {displayVars.length == 0 ? (
        <>
          <div className="header no-vars">
            <AddVariable
              varProject={project.name}
              varValues={displayVars}
              varTarget="Project"
            />
          </div>
          <hr style={{ margin: "30px 0" }} />
          <div style={{ textAlign: "center" }}>
            <label>No Project variables set</label>
          </div>
          <hr style={{ margin: "30px 0" }} />
        </>
      ) : (
        <>
          <div className="header">
            <label>Project Variables</label>
            <div className="header-buttons">
              <AddVariable
                varProject={project.name}
                varValues={displayVars}
                varTarget="Project"
              />
              <Button
                onClick={() => showVarValue()}
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
                <div className="delete">
                  <label>Delete</label>
                </div>
              </div>
              <div className="data-table">
                {displayVars.map((projEnvVar, index) => {
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
                              !valueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(projEnvVar.value).substring(0, 25)}
                                  <span onClick={() => valuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length <= 100 &&
                                valueState[index] ? (
                                <div className="showHideContainer">
                                  {projEnvVar.value}
                                  <span onClick={() => valuesHide(index)}>
                                    <Image
                                      src={hide}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length >= 100 &&
                                !valueState[index] ? (
                                <div className="showHideContainer">
                                  {hashValue(projEnvVar.value).substring(0, 25)}
                                  <span onClick={() => valuesShow(index)}>
                                    <Image
                                      src={show}
                                      className="showHide"
                                      style={{ all: "unset" }}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : projEnvVar.value.length >= 100 &&
                                valueState[index] ? (
                                <div className="showHideContainer">
                                  ${projEnvVar.value.substring(0, 25)}..
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
                        <div className="varDelete">
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
                                      name: projEnvVar.name,
                                      project: project.name,
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
                                  deleteName={projEnvVar.name}
                                  deleteFormat="svg"
                                  deleteImg={deleteVariable}
                                  onDelete={() =>
                                    deleteEnvVariableByNameHandler()
                                  }
                                />
                              );
                            }}
                          </Mutation>
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

export default ProjectVariables;