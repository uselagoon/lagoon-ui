import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import ReactSelect from "react-select";
import { Mutation } from "react-apollo";
import { color } from "lib/variables";
import withLogic from "components/AddEnvironmentVariable/logic";
import addOrUpdateEnvVariableMutation from "../../lib/mutation/AddOrUpdateEnvVariableByName";

/**
 * Adds a Project/Environment Variable.
 */

const targetOptions = [
  { value: "Project", label: "Project" },
  { value: "Environment", label: "Environment" },
];

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

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 400,
  }),
  control: (provided) => ({
    ...provided,
    width: 400,
  }),
};

export const AddEnvironmentVariable = ({
  varProject,
  varEnvironment,
  inputName,
  setInputName,
  inputValue,
  setInputValue,
  inputScope,
  setInputScope,
  inputTarget,
  setInputTarget,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <React.Fragment>
      <Button action={openModal}>Add</Button>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`}>
        <React.Fragment>
          <div className="var-modal">
            <label htmlFor="varName">Select variable target</label>
            {
              <ReactSelect
                aria-label="VariableTarget"
                placeholder="Project/Environment variable"
                styles={customStyles}
                name="targetResults"
                value={targetOptions.find((o) => o.value === inputTarget)}
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
                styles={customStyles}
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
              {(
                addOrUpdateEnvVariableByName,
                { loading, called, error, data }
              ) => {
                if (error) {
                  return <div>{error.message}</div>;
                }

                if (called) {
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

                const addOrUpdatePrjVariableHandler = () => {
                  addOrUpdateEnvVariableByName({
                    variables: {
                      input: {
                        name: inputName,
                        value: inputValue,
                        scope: inputScope,
                        project: varProject,
                      },
                    },
                  });
                  setTimeout(() => {
                    location.reload();
                  }, "2000");
                };

                return inputTarget == "Environment" ? (
                  <Button
                    disabled={
                      inputName == "" ||
                      inputValue == "" ||
                      inputScope == "" ||
                      inputTarget == ""
                    }
                    action={addOrUpdateEnvVariableHandler}
                    onClick={closeModal}
                  >
                    Add environment variable
                  </Button>
                ) : (
                  <Button
                    disabled={
                      inputName == "" ||
                      inputValue == "" ||
                      inputScope == "" ||
                      inputTarget == ""
                    }
                    action={addOrUpdatePrjVariableHandler}
                    onClick={closeModal}
                  >
                    Add project variable
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </React.Fragment>
      </Modal>
      <style jsx>{`
        .var-modal {
          padding: 10px 0;
        }
        input {
          margin-right: 10px;
          width: 100%;
        }
        a.hover-state {
          margin-right: 10px;
          color: ${color.blue};
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .add-var-btn {
          margin-top: 16px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(AddEnvironmentVariable);
