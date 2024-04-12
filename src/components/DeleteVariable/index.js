import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import ButtonBootstrap from 'react-bootstrap/Button';

import { LoadingOutlined } from '@ant-design/icons';
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
  open,
  openModal,
  closeModal,
  envValues,
  prjEnvValues,
  loading,
  valueState,
}) => {
  const handlePermissionCheck = () => {
    let waitForGQL = setTimeout(() => {
      openModal();
    }, [1000]);
    if (prjEnvValues || envValues) {
      clearTimeout(waitForGQL);
      openModal();
    }
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
            <Mutation mutation={DeleteEnvVariableMutation}>
              {(deleteEnvVariableByName, { loading, error, data }) => {
                if (error) {
                  console.error(error);
                  return <div>Unauthorized: You don't have permission to delete this variable.</div>;
                }

                if (data) {
                  refresh().then(setClear).then(closeModal);
                }

                const deleteEnvVariableByNameHandler = () => {
                  deleteEnvVariableByName({
                    variables: {
                      input: {
                        name: deleteName,
                        project: varProject,
                        environment: varEnvironment,
                      },
                    },
                  });
                };

                return (
                  <ButtonBootstrap
                    data-cy="delete-button"
                    disabled={inputValue !== deleteName}
                    className="btn-danger"
                    onClick={deleteEnvVariableByNameHandler}
                  >
                    {loading ? 'Deleting...' : data ? 'Success' : 'Delete'}
                  </ButtonBootstrap>
                );
              }}
            </Mutation>
          </div>
        </DeleteVariableModal>
      </Modal>
    </React.Fragment>
  );
};

export default withLogic(DeleteVariable);
