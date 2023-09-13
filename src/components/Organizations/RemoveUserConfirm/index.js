import React from 'react';

import { DisconnectOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/RemoveUserConfirm/logic';

import { Footer, RemoveModalHeader, RemoveModalParagraph } from '../SharedStyles';

/**
 * Confirms the removal of the specified email from group
 */
export const RemoveUserConfirm = ({ withText, onRemove, open, openModal, closeModal, info, loading }) => {
  return (
    <React.Fragment>
      {!withText ? (
        <Button variant="red" action={openModal}>
          <DisconnectOutlined className="delete" />
        </Button>
      ) : (
        <Button variant="primary" action={openModal}>
          Continue
        </Button>
      )}

      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm removal`}>
        <React.Fragment>
          <RemoveModalHeader>Are you sure?</RemoveModalHeader>
          <RemoveModalParagraph>
            This action will unlink user <span>{info.userEmail}</span> from group <span>{info.groupName}. </span>
          </RemoveModalParagraph>

          <Footer>
            <Button
              action={() => {
                onRemove().then(closeModal);
              }}
              variant="primary"
              disabled={loading}
              loading={loading}
            >
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
