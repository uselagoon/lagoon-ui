import React from 'react';

import Button from 'components/Button';
import withLogic from 'components/DeleteConfirm/logic';
import Modal from 'components/Modal';
import { color } from 'lib/variables';

/**
 * Confirms the deletion of the specified name and type.
 */
export const DeleteConfirm = ({
  deleteType,
  deleteName,
  onDelete,
  icon,
  loading,
  inputValue,
  setInputValue,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <React.Fragment>
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
      
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm delete ${deleteType}`}
      >
        <React.Fragment>
          <p>
            This will delete all resources associated with the {deleteType}{' '}
            <span className="delete-name">{deleteName}</span> and cannot be undone. Make sure this is something you
            really want to do!
          </p>
          <p>Type the name of the {deleteType} to confirm.</p>
          <div className="form-input">
            <input type="text" value={inputValue} onChange={setInputValue} />
            <button className="hover-state" onClick={closeModal}>
              cancel
            </button>
            <Button disabled={inputValue !== deleteName} action={onDelete} variant="red">
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </React.Fragment>
      </Modal>
      <style jsx>{`
        input {
          margin-right: 10px;
          width: 100%;
        }
        .hover-state {
          margin-right: 10px;
          color: ${color.blue};
        }
        .delete-name {
          font-weight: bold;
          color: ${color.lightBlue};
        }
        .form-input {
          display: flex;
          align-items: center;
        }
        .deleteConfirmImg span {
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(DeleteConfirm);
