import React, { FC } from 'react';

// @TODO: add this once the logic exists
import withLogic from 'components/ActiveStandbyConfirm/logic';
import Button from 'components/Button';
import Modal from 'components/Modal';

import { StyledActiveStandbyConfirm, StyledActiveStandbyConfirmModal } from './StyledActiveStandbyConfirm';

/**
 * Confirms the deletion of the specified name and type.
 */
interface ActiveStandbyConfirmProps {
  activeEnvironment: string;
  standbyEnvironment: string;
  onProceed: () => void;
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ActiveStandbyConfirm: FC<ActiveStandbyConfirmProps> = ({
  activeEnvironment,
  standbyEnvironment,
  onProceed,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <StyledActiveStandbyConfirm>
      <div className="margins">
        <Button action={openModal}>Switch Active/Standby environments</Button>
      </div>
      <Modal variant={null} isOpen={open} onRequestClose={closeModal} contentLabel="Confirm">
        <StyledActiveStandbyConfirmModal>
          <p>
            This will replace the current active environment
            <span className="environment-name"> {activeEnvironment}</span>
            <br />
            with the selected standby environment
            <span className="environment-name"> {standbyEnvironment}</span>.
            <br />
            <br />
            Are you sure you want to do this?
            <br />
            <br />
            Upon confirmation you will be taken to the task page to monitor execution.
          </p>

          <div className="form-input">
            <button className="hover-state margins" onClick={closeModal}>
              cancel
            </button>
            <Button action={onProceed}>Confirm</Button>
          </div>
        </StyledActiveStandbyConfirmModal>
      </Modal>
    </StyledActiveStandbyConfirm>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// @ts-ignore
export default withLogic(ActiveStandbyConfirm);
