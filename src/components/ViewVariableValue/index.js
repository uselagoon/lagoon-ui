import React from "react";
import Modal from "components/Modal";
import withLogic from "components/ViewVariableValue/logic";
import {
  StyledViewVariableValue,
  StyledViewVariableValueModal,
} from "./StyledViewVariableValue";

/**
 * Displays the value of the selected variable.
 */
export const ViewVariableValue = ({
  variableName,
  variableValue,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <StyledViewVariableValue>
      <div className="margins">
        <a className="hover-state" onClick={openModal}>
          <label>View full value</label>
        </a>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        variant="xl"
      >
        <StyledViewVariableValueModal>
          <button type="button" className="button-sort">
            Variable Name
          </button>
          <div className="data-row row-heading">
            <div className="col col-3">{variableName}</div>
          </div>
          <button type="button" className="button-sort">
            Variable Value
          </button>
          <div className="data-row row-heading">
            <div className="col col-3">{variableValue}</div>
          </div>

          <div className="form-input">
            <span className="hover-state margins" onClick={closeModal}>
              Close
            </span>
          </div>
        </StyledViewVariableValueModal>
      </Modal>
    </StyledViewVariableValue>
  );
};

export default withLogic(ViewVariableValue);
