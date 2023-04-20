import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import Button from 'components/Button';
import Modal from 'components/Modal';

import { StyledCustomTaskConfirm } from './Styles';

interface CustomTaskConfirmProps {
  taskText: string;
  onProceed: () => void;
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  disabled: boolean;
}

/**
 * Confirm custom task
 */
export const CustomTaskConfirm: FC<CustomTaskConfirmProps> = ({
  taskText,
  onProceed,
  open,
  openModal,
  closeModal,
  disabled,
}) => {
  return (
    <StyledCustomTaskConfirm>
      <div className="margins">
        <Button disabled={disabled} action={openModal}>
          Confirm Task
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`}>
        <React.Fragment>
          <ReactMarkdown>{taskText}</ReactMarkdown>
          <div className="form-input">
            <a href="#" className="hover-state margins" onClick={closeModal}>
              Cancel
            </a>
            <Button action={onProceed}>Confirm</Button>
          </div>
        </React.Fragment>
      </Modal>
    </StyledCustomTaskConfirm>
  );
};
