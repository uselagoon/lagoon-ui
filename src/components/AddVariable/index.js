import React, { useEffect, useMemo, useState } from 'react';
import ButtonBootstrap from 'react-bootstrap/Button';
import ReactSelect from 'react-select';

import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Popconfirm } from 'antd';
import withLogic from 'components/AddVariable/logic';
import Button from 'components/Button';
import Modal from 'components/Modal';

import addOrUpdateEnvVariableMutation from '../../lib/mutation/AddOrUpdateEnvVariableByName';
import { NewVariable, NewVariableModal } from './StyledAddVariable';

/**
 * Adds a Variable.
 */

const scopeOptions = [
  { value: 'BUILD', label: 'BUILD' },
  { value: 'RUNTIME', label: 'RUNTIME' },
  { value: 'GLOBAL', label: 'GLOBAL' },
  { value: 'CONTAINER_REGISTRY', label: 'CONTAINER_REGISTRY' },
  {
    value: 'INTERNAL_CONTAINER_REGISTRY',
    label: 'INTERNAL_CONTAINER_REGISTRY',
  },
];

export const AddVariable = ({
  varOrganization,
  varProject,
  varEnvironment,
  varValues,
  varTarget,
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
  setEnvironmentErrorAlert,
  setProjectErrorAlert,
  setOrganizationErrorAlert,
  action,
  loading,
  orgEnvValues,
  prjEnvValues,
  envValues,
}) => {
  const [updateName, setUpdateName] = useState(varName);
  const [updateValue, setUpdateValue] = useState(varValue);
  const [updateScope, setUpdateScope] = useState(varScope);
  const [openPop, setOpenPop] = useState(false);
  const [hasCalled, setHasCalled] = useState(false);
  const handleUpdateValue = event => {
    setUpdateValue(event.target.value);
  };
  const handlePopCancel = () => {
    setOpenPop(false);
  };
  const showPopconfirm = () => {
    setOpenPop(true);
  };
  useEffect(() => {
    setUpdateValue(varValue);
    setUpdateName(varName);
    setUpdateScope(varScope);
  }, [varName, varValue]);
  const handleError = () => {
    if (setOrganizationErrorAlert) {
      setOrganizationErrorAlert(true);
    } else if (setProjectErrorAlert) {
      setProjectErrorAlert(true);
    } else {
      setEnvironmentErrorAlert(true);
    }
  };

  const handlePermissionCheck = () => {
    let waitForGQL = setTimeout(() => {
      openModal();
    }, [1000]);
    if (orgEnvValues || prjEnvValues || envValues) {
      clearTimeout(waitForGQL);
      openModal();
    }
  };

  const handleCloseModal = () => {
    setHasCalled(false);
    closeModal();
  };

  const [addOrUpdateEnvVariableByName, { called, loading: mutationLoading, data, error }] = useMutation(
    addOrUpdateEnvVariableMutation,
    {
      onError: e => console.error(e),
    }
  );

  const updateVar = useMemo(() => {
    const vars = varValues.map(varName => varName.name);
    return vars.includes(inputName);
  }, [varValues, inputName]);

  useEffect(() => {
    if (data) {
      refresh().then(setClear).then(handleCloseModal);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      refresh().then(handleCloseModal).then(handleError);
    }
  }, [error]);

  const addOrUpdateEnvVariableHandler = () => {
    setHasCalled(true);
    addOrUpdateEnvVariableByName({
      variables: {
        input: {
          name: updateName ? updateName : inputName,
          value: updateValue ? updateValue : inputValue,
          scope: updateScope ? updateScope.toUpperCase() : inputScope,
          organization: varOrganization,
          project: varProject,
          environment: varEnvironment,
        },
      },
    });
    setTimeout(() => {
      setOpenPop(false);
    }, 1000);
  };

  return (
    <NewVariable>
      {icon ? (
        <Button variant="white" icon={icon} action={openModal}>
          Update
        </Button>
      ) : !loading ? (
        <ButtonBootstrap data-cy="addVariable" onClick={handlePermissionCheck}>
          Add
        </ButtonBootstrap>
      ) : (
        <ButtonBootstrap className="add-variable">
          <LoadingOutlined />
        </ButtonBootstrap>
      )}
      <Modal isOpen={open} onRequestClose={handleCloseModal} contentLabel={`Confirm`} variant={'large'}>
        <NewVariableModal>
          <div className="variable-target">
            <span className="variable-target">
              {!updateName ? `Add ${varTarget} Variable` : `Update ${varTarget} Variable`}
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
                value={
                  varScope
                    ? scopeOptions.find(o => o.value === updateScope.toUpperCase())
                    : scopeOptions.find(o => o.value === inputScope)
                }
                onChange={
                  varScope
                    ? selectedOption => setUpdateScope(selectedOption.value)
                    : selectedOption => setInputScope(selectedOption.value)
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
            <label htmlFor="varValue">Value</label>
            <textarea
              data-cy="varValue"
              id="varValueId"
              name="varValue"
              className="addVarValueInput"
              value={varValue ? updateValue : inputValue}
              onChange={varValue ? handleUpdateValue : setInputValue}
            ></textarea>
          </div>
          <div className="form-input add-var-btn" data-cy="add-variable">
            <a href="#" className="hover-state" onClick={handleCloseModal}>
              cancel
            </a>
            {(action === 'add' && inputValue === '') ||
            (action === 'edit' && updateValue === '' && inputValue === '') ? (
              <Popconfirm
                title="No value set for this variable."
                description="Are you sure you want to continue?"
                open={openPop}
                onConfirm={addOrUpdateEnvVariableHandler}
                okButtonProps={{
                  loading: mutationLoading,
                }}
                onCancel={handlePopCancel}
              >
                <ButtonBootstrap
                  disabled={
                    updateName ? updateName === '' || updateScope === '' : inputName === '' || inputScope === ''
                  }
                  onClick={showPopconfirm}
                >
                  {hasCalled
                    ? action === 'edit' || updateVar || varName
                      ? 'Updating variable'
                      : 'Adding variable'
                    : updateVar || varName
                      ? `Update ${varTarget.toLowerCase()} variable`
                      : `Add ${varTarget.toLowerCase()} variable`}
                </ButtonBootstrap>
              </Popconfirm>
            ) : (
              <ButtonBootstrap
                disabled={updateName ? updateName === '' || updateScope === '' : inputName === '' || inputScope === ''}
                onClick={addOrUpdateEnvVariableHandler}
              >
                {hasCalled
                  ? action === 'edit' || updateVar || varName
                    ? 'Updating variable'
                    : 'Adding variable'
                  : updateVar || varName
                    ? `Update ${varTarget.toLowerCase()} variable`
                    : `Add ${varTarget.toLowerCase()} variable`}
              </ButtonBootstrap>
            )}
          </div>
        </NewVariableModal>
      </Modal>
    </NewVariable>
  );
};

export default withLogic(AddVariable);
