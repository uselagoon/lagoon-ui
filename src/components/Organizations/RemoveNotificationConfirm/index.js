import React from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/RemoveNotificationConfirm/logic';

import { Footer, RemoveModalHeader, RemoveModalParagraph } from '../SharedStyles';

/**
 * Confirms the removal of the specified email from group
 */
export const RemoveNotificationConfirm = ({ removeName, onRemove, open, openModal, closeModal }) => {
  return (
    <React.Fragment>
      <Button variant="red" action={openModal} icon={<DeleteOutlined />}></Button>

      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm removal`}>
        <React.Fragment>
          <RemoveModalHeader>Are you sure?</RemoveModalHeader>
          <RemoveModalParagraph>
            This action will delete this entry, you might not be able to get this back.
          </RemoveModalParagraph>
          <Footer>
            <Button action={onRemove} variant="primary">
              Continue
            </Button>
            <Button action={closeModal} variant="ghost">
              Cancel
            </Button>
          </Footer>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default withLogic(RemoveNotificationConfirm);
