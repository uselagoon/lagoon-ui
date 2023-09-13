import React, {useEffect, useState} from "react";
import Modal from "components/Modal";
import ButtonBootstrap from "react-bootstrap/Button";
import Button from 'components/Button'
import { Mutation } from "react-apollo";
import withLogic from "components/AddVariable/logic";
import {DeleteVariableModal, DeleteVariableButton} from "./StyledDeleteVariable";
import DeleteEnvVariableMutation from "../../lib/mutation/deleteEnvVariableByName";

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
}) => {
  return (
      <React.Fragment>
        <DeleteVariableButton>
          {
            icon ?
              <Button variant='red' icon={icon} action={openModal}>
                Delete
              </Button>
              :
              <Button variant='red' action={openModal}>
                Delete
              </Button>
          }
        </DeleteVariableButton>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        variant={"large"}
      >
        <DeleteVariableModal>
          <p>
            This will delete the {deleteType}{' '}
            <span className="delete-name">{deleteName}</span> and cannot be undone. Make sure this is something you
            really want to do!
          </p>
          <p>Type the name of the {deleteType} to confirm.</p>
          <div className="form-input">
            <input type="text" value={inputValue} onChange={setInputValue} />
            <button className="hover-state" onClick={closeModal}>
              cancel
            </button>
            <Mutation mutation={DeleteEnvVariableMutation}>
              {(deleteEnvVariableByName, { loading, error, data }) => {
                if (error) {
                  console.error(error);
                  return (
                      <div>
                        Unauthorized: You don't have permission to
                        delete this variable.
                      </div>
                  );
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
                  <ButtonBootstrap disabled={inputValue !== deleteName} className='btn-danger' onClick={deleteEnvVariableByNameHandler}>
                    {loading ? 'Deleting...' : 'Delete'}
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
