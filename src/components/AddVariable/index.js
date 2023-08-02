import React from "react";
import Modal from "components/Modal";
import Button from "react-bootstrap/Button";
import ReactSelect from "react-select";
import { Mutation } from "react-apollo";
import withLogic from "components/AddVariable/logic";
import addOrUpdateEnvVariableMutation from "../../lib/mutation/AddOrUpdateEnvVariableByName";
import { NewVariable, NewVariableModal, custom } from "./StyledAddVariable";

/**
 * Adds a Variable.
 */

const scopeOptions = [
  { value: "BUILD", label: "BUILD" },
  { value: "RUNTIME", label: "RUNTIME" },
  { value: "GLOBAL", label: "GLOBAL" },
  { value: "CONTAINER_REGISTRY", label: "CONTAINER_REGISTRY" },
  {
    value: "INTERNAL_CONTAINER_REGISTRY",
    label: "INTERNAL_CONTAINER_REGISTRY",
  },
];

export const AddVariable = ({
  varProject,
  varEnvironment,
  varValues,
  varTarget,
  noVars,
  refresh,
  inputName,
  setInputName,
  inputValue,
  setInputValue,
  inputScope,
  setInputScope,
  open,
  openModal,
  closeModal,
  setClear
}) => {
  return (
    <NewVariable>
      <Button onClick={openModal}>
        {
          noVars? "Add" : "Add/Update"
        }
      </Button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        variant={"large"}
      >
        <NewVariableModal>
          <div className="variable-target">
            <span className="variable-target">
              {
                noVars? `Add ${varTarget} Variable` : `Add/Update ${varTarget} Variable`
              }
            </span>
          </div>
          <div className="var-modal">
            <label htmlFor="varName">Scope</label>
            {
              <ReactSelect
                classNamePrefix="react-select"
                aria-label="Scope"
                placeholder="Select a variable scope"
                name="results"
                value={scopeOptions.find((o) => o.value === inputScope)}
                onChange={(selectedOption) =>
                  setInputScope(selectedOption.value)
                }
                options={scopeOptions}
                required
              />
            }
          </div>
          <div className="var-modal">
            <label htmlFor="varName">Name</label>
            <input
              id="varNameId"
              name="varName"
              className="addVarnameInput"
              type="text"
              value={inputName}
              onChange={setInputName}
            />
          </div>
          <div className="var-modal">
            <label htmlFor="varName">Value</label>
            <input
              id="varValueId"
              name="varValue"
              className="addVarValueInput"
              type="text"
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
          <div className="form-input add-var-btn">
            <a href="#" className="hover-state" onClick={closeModal}>
              cancel
            </a>
            <Mutation mutation={addOrUpdateEnvVariableMutation}>
              {(addOrUpdateEnvVariableByName, { called, error, data }) => {
                let updateVar = varValues.map((varName) => {
                  return varName.name;
                });

                updateVar = updateVar.includes(inputName);

                if (error) {
                  console.error(error);
                  return (
                    <div>
                      Unauthorized: You don't have permission to create this
                      variable.
                    </div>
                  );
                }

                if (data) {
                  refresh().then(setClear).then(closeModal);
                }

                if (updateVar && called) {
                  return <div>Updating variable</div>;
                } else if (called) {
                  return <div>Adding variable</div>;
                }

                const addOrUpdateEnvVariableHandler = () => {
                  addOrUpdateEnvVariableByName({
                    variables: {
                      input: {
                        name: inputName,
                        value: inputValue,
                        scope: inputScope,
                        project: varProject,
                        environment: varEnvironment,
                      },
                    },
                  });
                };

                return (
                  <Button
                    disabled={
                      inputName == "" || inputValue == "" || inputScope == ""
                    }
                    onClick={addOrUpdateEnvVariableHandler}
                  >
                    {varTarget == "Environment"
                      ? updateVar
                        ? "Update environment variable"
                        : "Add environment variable"
                      : updateVar
                      ? "Update project variable"
                      : "Add project variable"}
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </NewVariableModal>
      </Modal>
    </NewVariable>
  );
};

export default withLogic(AddVariable);
