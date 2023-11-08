import React from 'react';

import { DisconnectOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/RemoveProjectGroupConfirm/logic';

import { Footer, RemoveModalHeader, RemoveModalParagraph } from '../SharedStyles';

/**
 * Confirms the removal of the specified email from group
 */
export const RemoveProjectGroupConfirm = ({ info, onRemove, open, openModal, closeModal, loading }) => {
  return (
    <React.Fragment>
      <Button
        variant="red"
        action={openModal}
        icon={
          <Tooltip overlayClassName="orgTooltip" title="Unlink" placement="bottom">
            <DisconnectOutlined className="delete" />
          </Tooltip>
        }
      />

      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm removal`}>
        <React.Fragment>
          <RemoveModalHeader>Are you sure?</RemoveModalHeader>
          <RemoveModalParagraph>
            This action will unlink {info.type} <span>{info.deleteName}</span> from project{' '}
            <span>{info.projectName}</span>.
          </RemoveModalParagraph>

          <Footer>
            <Button action={onRemove} disabled={loading} loading={loading} variant="primary">
              Continue
            </Button>
            <Button variant="ghost" action={() => closeModal()}>
              Cancel
            </Button>
          </Footer>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default withLogic(RemoveProjectGroupConfirm);
