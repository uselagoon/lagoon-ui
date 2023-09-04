import React from 'react';

import { DisconnectOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/RemoveUserConfirm/logic';

import { Footer } from '../SharedStyles';

/**
 * Confirms the removal of the specified email from group
 */
export const RemoveUserConfirm = ({ removeName, onRemove, open, openModal, closeModal }) => {
  return (
    <React.Fragment>
      <Button variant="red" action={openModal}>
        <DisconnectOutlined className="delete" />
      </Button>

      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm removal`}>
        <React.Fragment>
          <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
          <p style={{ fontSize: '16px', lineHeight: '24px' }}>
            This action will delete this entry, you might not be able to get this back.
          </p>

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

export default withLogic(RemoveUserConfirm);
