import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { color } from 'lib/variables';
import withLogic from 'components/DeleteConfirm/logic';
import useTranslation from "lib/useTranslation";
/**
 * Confirms the deletion of the specified name and type.
 */
export const DeleteConfirm = ({
  deleteType,
  deleteName,
  onDelete,
  inputValue,
  setInputValue,
  open,
  openModal,
  closeModal
}) => {
   const t = useTranslation();
  return (
    <React.Fragment>
      <Button variant="red" action={openModal}>
        {t("general.delete")}
      </Button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm delete ${deleteType}`}
      >
        <React.Fragment>
          <p>
            {t("general.deleteConfirmInfo", { deleteType })}
            <span className="delete-name">{deleteName}</span>{" "}
            {t("general.deleteConfirmUndone")}
          </p>
          <p>{t("general.deleteConfirm", { deleteType })}</p>
          <div className="form-input">
            <input type="text" value={inputValue} onChange={setInputValue} />
            <a href="#" className="hover-state" onClick={closeModal}>
              {t("general.cancel")}
            </a>
            <Button
              disabled={inputValue !== deleteName}
              action={onDelete}
              variant="red"
            >
              {t("general.delete")}
            </Button>
          </div>
        </React.Fragment>
      </Modal>
      <style jsx>{`
        input {
          margin-right: 10px;
          width: 100%;
        }
        a.hover-state {
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
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(DeleteConfirm);
