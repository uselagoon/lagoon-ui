import React from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/RemoveNotificationConfirm/logic';

import { Footer, RemoveModalHeader, RemoveModalParagraph } from '../SharedStyles';

/**
 * Confirms the removal of the specified email from group
 */
export const RemoveNotificationConfirm = ({ info, onRemove, open, openModal, closeModal, loading }) => {
  return (
    <React.Fragment>
      <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Delete notification">
        <>
          <Button variant="red" action={openModal} icon={<DeleteOutlined />}></Button>
        </>
      </Tooltip>

      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm removal`}>
        <React.Fragment>
          <RemoveModalHeader>Are you sure?</RemoveModalHeader>
          <RemoveModalParagraph>
            This action will delete <span>{info.name}</span> notification.
          </RemoveModalParagraph>
          <Footer>
            <Button testId="confirmDelete" action={onRemove} disabled={loading} loading={loading} variant="primary">
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
