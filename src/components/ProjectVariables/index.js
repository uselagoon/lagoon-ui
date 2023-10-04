import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectByNameWithEnvVarsValueQuery from "../../lib/query/ProjectByNameWithEnvVarsValue";
import { useLazyQuery } from "@apollo/react-hooks";
import AddVariable from "../AddVariable";
import ViewVariableValue from "../ViewVariableValue";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import withLogic from 'components/DeleteConfirm/logic';
import Image from "next/image";
import show from "../../static/images/show.svg";
import hide from "../../static/images/hide.svg";
import {
  StyledProjectVariablesDetails,
  StyledProjectVariableTable,
  VariableActions,
} from "./StyledProjectVariables";
import DeleteVariable from "components/DeleteVariable";
import Alert from 'components/Alert'

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

const ProjectVariables = ({ project, onVariableAdded, closeModal }) => {
  let displayVars = project.envVariables;
  let initValueState = new Array(displayVars.length).fill(false);

  const [valueState, setValueState] = useState(initValueState);
  const [openPrjVars, setOpenPrjVars] = useState(false);
  const [updateVarValue, setUpdateVarValue ] = useState('');
  const [updateVarName, setUpdateVarName ] = useState('');
  const [updateVarScope, setUpdateVarScope ] = useState('');
  const [projectErrorAlert, setProjectErrorAlert] = useState(false);

  const closeProjectError = () => {
    setProjectErrorAlert(false);
  };


  const [
    getPrjEnvVarValues,
    { loading: prjLoading, error: prjError, data: prjEnvValues },
  ] = useLazyQuery(ProjectByNameWithEnvVarsValueQuery, {
    variables: { name: project.name },
    onError: () => {
      setOpenPrjVars(!openPrjVars);
      setProjectErrorAlert(true);
    }
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

  const setUpdateValue = (rowValue, rowName, rowScope) => {
    setUpdateVarValue(rowValue);
    setUpdateVarName(rowName)
    setUpdateVarScope(rowScope)
  }

  return (
    <StyledProjectVariablesDetails className="details">
      {displayVars.length == 0 ? (
        <>
          <div className="header no-vars">
            <AddVariable
              varProject={project.name}
              varValues={displayVars}
              varTarget="Project"
              refresh={onVariableAdded}
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
          {
            projectErrorAlert && (
              <Alert
                type="error"
                closeAlert={closeProjectError}
                header="Unauthorized:"
                message="You don't have permission to view project variable values. Contact your administrator to obtain the relevant permissions."
              />
            )
          }
          <div className="header">
            <label>Project Variables</label>
            <div className="header-buttons">
              <Button
                  onClick={() => setOpenPrjVars(false)}
                  style={{ all: "unset" }}
              >
                <AddVariable
                  varProject={project.name}
                  varValues={displayVars}
                  varTarget="Project"
                  refresh={onVariableAdded}
                />
              </Button>
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
                          ''
                        )}
                        <div className="varActions">
                          <VariableActions>
                            <Collapse in={openPrjVars}>
                              <div className="varUpdate">
                                <Button
                                    onClick={() => setUpdateValue(projEnvVar.value, projEnvVar.name, projEnvVar.scope)}
                                    style={{ all: 'unset'}}
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
                                  />
                                </Button>
                              </div>
                            </Collapse>
                            <div className="varDelete">
                              <DeleteVariable
                                  deleteType="Project variable"
                                  deleteName={projEnvVar.name}
                                  varProject={project.name}
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
            </StyledProjectVariableTable>
          </div>
        </>
      )}
    </StyledProjectVariablesDetails>
  );
};

export default withLogic(ProjectVariables);
