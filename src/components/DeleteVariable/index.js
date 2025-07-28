import React, { useEffect, useState } from 'react';
import ButtonBootstrap from 'react-bootstrap/Button';

import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import withLogic from 'components/AddVariable/logic';
import Button from 'components/Button';
import Modal from 'components/Modal';

import DeleteEnvVariableMutation from '../../lib/mutation/deleteEnvVariableByName';
import { DeleteVariableButton, DeleteVariableModal } from './StyledDeleteVariable';

/**
 * Deletes a Variable.
 */

export const DeleteVariable = ({
  deleteType,
  deleteName,
  icon,
  refresh,
  inputValue,
  setInputValue,
  setClear,
  varEnvironment,
  varProject,
  varOrganization,
  open,
  openModal,
  closeModal,
  envValues,
  prjEnvValues,
  orgEnvValues,
  loading,
  valueState,
}) => {
  const handlePermissionCheck = () => {
    let waitForGQL = setTimeout(() => {
      openModal();
    }, [1000]);
    if (orgEnvValues || prjEnvValues || envValues) {
      clearTimeout(waitForGQL);
      openModal();
    }
  };

  const [deleteEnvVariableByName, { loading: mutationLoading, error, data }] = useMutation(DeleteEnvVariableMutation, {
    onCompleted: () => {
      refresh().then(setClear).then(closeModal);
    },
    onError: error => {
      console.error(error);
      return <div>Unauthorized: You don't have permission to delete this variable.</div>;
    },
  });

  const deleteEnvVariableByNameHandler = () => {
    deleteEnvVariableByName({
      variables: {
        input: {
          name: deleteName,
          organization: varOrganization,
          project: varProject,
          environment: varEnvironment,
        },
      },
    });
  };

  return (
    <React.Fragment>
      <DeleteVariableButton>
        {loading && valueState ? (
          <Button variant="red" action={openModal}>
            <LoadingOutlined />
          </Button>
        ) : (
          <Button variant="red" icon={icon} action={handlePermissionCheck}></Button>
        )}
      </DeleteVariableButton>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} variant={'large'}>
        <DeleteVariableModal>
          <p>
            This will delete the {deleteType} <span className="delete-name">{deleteName}</span> and cannot be undone.
            Make sure this is something you really want to do!
          </p>
          <p>Type the name of the {deleteType} to confirm.</p>
          <div className="form-input">
            <input data-cy="variable-input" type="text" value={inputValue} onChange={setInputValue} />
            <button className="hover-state" onClick={closeModal}>
              cancel
            </button>
            <ButtonBootstrap
              data-cy="delete-button"
              disabled={inputValue !== deleteName}
              className="btn-danger"
              onClick={deleteEnvVariableByNameHandler}
            >
              {mutationLoading ? 'Deleting...' : data ? 'Success' : 'Delete'}
            </ButtonBootstrap>
          </div>
        </DeleteVariableModal>
      </Modal>
    </React.Fragment>
  );
};

export default withLogic(DeleteVariable);
