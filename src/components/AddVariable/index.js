import React, {useEffect, useState} from "react";
import Modal from "components/Modal";
import ButtonBootstrap from "react-bootstrap/Button";
import Button from 'components/Button'
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
  varName,
  varValue,
  varScope,
  refresh,
  icon,
  inputName,
  setInputName,
  inputValue,
  setInputValue,
  inputScope,
  setInputScope,
  open,
  openModal,
  closeModal,
  setClear,
}) => {
  const [updateName, setUpdateName] = useState(varName);
  const [updateValue, setUpdateValue] = useState(varValue);
  const [updateScope, setUpdateScope] = useState(varScope);
  const handleUpdateValue = (event) => {setUpdateValue(event.target.value)};
  useEffect(() => {
    setUpdateValue(varValue);
    setUpdateName(varName);
    setUpdateScope(varScope);
  }, [varValue]);

  return (
      <NewVariable>
      {
        icon ?
            <Button variant='white' icon={icon} action={openModal}>
              Update
            </Button>
          :
          <ButtonBootstrap 
            data-cy="addVariable"
            onClick={openModal}
          >
            {
              noVars || !updateName ? "Add" : "Update"
            }
          </ButtonBootstrap>
      }
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
                noVars || !updateName ? `Add ${varTarget} Variable` : `Update ${varTarget} Variable`
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
                value={varScope ? scopeOptions.find((o) => o.value === updateScope.toUpperCase()) : scopeOptions.find((o) => o.value === inputScope)}
                onChange={varScope ? (selectedOption) => setUpdateScope(selectedOption.value)
                    : (selectedOption) => setInputScope(selectedOption.value)
                }
                options={scopeOptions}
                required
              />
            }
          </div>
          <div className="var-modal">
            <label htmlFor="varName">Name</label>
            <input
              data-cy="varName"
              id="varNameId"
              name="varName"
              className="addVarnameInput"
              type="text"
              value={varName ? updateName : inputName}
              onChange={!varName ? setInputName : null}
              readOnly={!!varName}
            />
          </div>
          <div className="var-modal">
            <label htmlFor="varName">Value</label>
            <input
              data-cy="varValue"
              id="varValueId"
              name="varValue"
              className="addVarValueInput"
              type="text"
              value={varValue ? updateValue : inputValue}
              onChange={varValue ? handleUpdateValue : setInputValue}
            />
          </div>
          <div className="form-input add-var-btn">
            <a href="#" className="hover-state" onClick={closeModal}>
              cancel
            </a>
            <Mutation mutation={addOrUpdateEnvVariableMutation} onError={(e)=>console.error(e)}>
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

                if (updateVar && called || updateName && called ) {
                  return <div>Updating variable</div>;
                } else if (called) {
                  return <div>Adding variable</div>;
                }

                const addOrUpdateEnvVariableHandler = () => {
                  addOrUpdateEnvVariableByName({
                    variables: {
                      input: {
                        name: updateName ? updateName : inputName,
                        value: updateValue ? updateValue : inputValue,
                        scope: updateScope ? updateScope.toUpperCase() : inputScope,
                        project: varProject,
                        environment: varEnvironment,
                      },
                    },
                  });
                };

                return (
                  <ButtonBootstrap
                    disabled={ updateName ?
                      updateName === "" || updateValue === "" || updateScope === ""
                        :
                      inputName === "" || inputValue === "" || inputScope === ""
                    }
                    onClick={addOrUpdateEnvVariableHandler}
                  >
                    {varTarget == "Environment"
                      ? updateVar || varName
                        ? "Update environment variable"
                        : "Add environment variable"
                      : updateVar || varName
                      ? "Update project variable"
                      : "Add project variable"}
                  </ButtonBootstrap>
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
