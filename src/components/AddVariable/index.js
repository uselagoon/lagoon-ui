import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import ReactSelect from "react-select";
import { Mutation } from "react-apollo";
import withLogic from "components/AddVariable/logic";
import addOrUpdateEnvVariableMutation from "../../lib/mutation/AddOrUpdateEnvVariableByName";
import { NewVariable, NewVariableModal } from "./StyledAddVariable";

/**
 * Adds a Environment Variable.
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
  inputName,
  setInputName,
  inputValue,
  setInputValue,
  inputScope,
  setInputScope,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <NewVariable>
      <Button action={openModal}>Add/Update</Button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        variant={"large"}
      >
        <NewVariableModal>
          <div className="var-modal">
            <label htmlFor="varName">Variable target</label>
            <input
              id="variableTargetID"
              name="variableTarget"
              className="variable-target"
              type="text"
              value={varTarget}
              readOnly
            />
          </div>
          <div className="var-modal">
            <label htmlFor="varName">Variable Scope</label>
            {
              <ReactSelect
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
            <label htmlFor="varName">Variable Name</label>
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
            <label htmlFor="varName">Variable Value</label>
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
              {(addOrUpdateEnvVariableByName, { called, error }) => {
                let updateVar = varValues.map((varName) => {
                  return varName.name;
                });

                updateVar = updateVar.includes(inputName);

                if (error) {
                  console.error(error)
                  return <div>Unauthorized: You don't have permission to create
                  this variable.</div>;
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
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                };

                return (
                  <Button
                    disabled={
                      inputName == "" || inputValue == "" || inputScope == ""
                    }
                    action={addOrUpdateEnvVariableHandler}
                    onClick={closeModal}
                  >
                    {varTarget == "Environment"
                      ? updateVar
                        ? "Update environment variable"
                        : "Add environment variable"
                      : updateVar
                      ? "Update project variable"
                      : "Add project variable"
                    }
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
