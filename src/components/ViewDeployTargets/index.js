import React from "react";
import Modal from "components/Modal";
import withLogic from "components/ViewDeployTargets/logic";
import {StyledViewDeployTargets, StyledViewDeployTargetsModal} from "./StyledViewDeployTargets"


/**
 * Displays the value of the selected variable.
 */
export const ViewDeployTargets = ({
  deployTargetNo,
  deployTargets,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <StyledViewDeployTargets>
      <div className="margins">
        <a className="hover-state" onClick={openModal}>
          <label>{deployTargetNo}</label>
        </a>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        variant="xl"
      >
        <StyledViewDeployTargetsModal>
        <button type="button" className="button-sort">
            Deploy Targets
        </button>
        <div className="deployTargetsWrapper">
        {deployTargets.map(depTarget => (
          <div className="deployTargets" key={depTarget.id}>
            <div className="data-row row-heading">
              <label className="button-sort">{depTarget.deployTarget.friendlyName != null
                    ? depTarget.deployTarget.friendlyName
                    : depTarget.deployTarget.name}</label>
            </div>
            <label>Branches enabled</label>
            <div className="data-row row-heading">{depTarget.branches}</div>
            <label>Pull requests enabled</label>
            <div className="data-row row-heading">{depTarget.pullrequests}</div>
          </div>
        ))}
        </div>

          {/* <button type="button" className="button-sort">
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
          </div> */}

          <div className="form-input">
            <a href="#" className="hover-state margins" onClick={closeModal}>
              Close
            </a>
          </div>
        </StyledViewDeployTargetsModal>
      </Modal>
    </StyledViewDeployTargets>
  );
};

export default withLogic(ViewDeployTargets);
