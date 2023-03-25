import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import ReactSelect from "react-select";
import { Mutation } from "react-apollo";
import withLogic from "components/AddEnvironmentVariable/logic";
import addOrUpdateEnvVariableMutation from "../../lib/mutation/AddOrUpdateEnvVariableByName";
import { NewEnvironmentVariable, NewEnvironmentVariableModal } from './StyledAddEnvironmentVariable';

/**
 * Adds a Environment Variable.
 */

const targetOptions = [{ value: "Environment", label: "Environment" }];

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

export const AddEnvironmentVariable = ({
  varProject,
  varEnvironment,
  varValues,
  inputName,
  setInputName,
  inputValue,
  setInputValue,
  inputScope,
  setInputScope,
  setInputTarget,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <NewEnvironmentVariable>
      <Button action={openModal}>Add/Update</Button>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} variant={'large'}>
        <NewEnvironmentVariableModal>
          <div className="var-modal">
            <label htmlFor="varName">Select variable target</label>
            {
              <ReactSelect
                aria-label="VariableTarget"
                placeholder="Environment variable"
                name="targetResults"
                value={targetOptions[0]}
                onChange={(selectedOption) =>
                  setInputTarget(selectedOption.value)
                }
                options={targetOptions}
                required
              />
            }
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
                  return <div>{error.message}</div>;
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
                  }, "2000");
                };

                return (
                  <Button
                    disabled={
                      inputName == "" || inputValue == "" || inputScope == ""
                    }
                    action={addOrUpdateEnvVariableHandler}
                    onClick={closeModal}
                  >
                    {updateVar
                      ? "Update environment variable"
                      : "Add environment variable"}
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </NewEnvironmentVariableModal>
      </Modal>
    </NewEnvironmentVariable>
  );
};

export default withLogic(AddEnvironmentVariable);
