import React, { FC, useState } from 'react';

import { ApolloError } from '@apollo/client';
import { Button, Modal, Text, useNotification } from '@uselagoon/ui-library';

import { ConfirmModalWrapper, ModalContent } from '../deleteConfirm/styles';
import { Highlighted } from '../pages/projectVariables/_components/styles';

/**
 * Confirms the deletion of the specified name and type.
 */
interface ActiveStandbyConfirmProps {
  activeEnvironment: string;
  standbyEnvironment: string | null;
  action: () => void | any | Promise<any>;
  loading: boolean;
}

export const ActiveStandbyConfirm: FC<ActiveStandbyConfirmProps> = ({
  activeEnvironment,
  standbyEnvironment,
  action,
  loading,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem switching active/standby.',
    placement: 'top',
    duration: 0,
    content: null,
  });

  const handleCancel = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const confirmSwitch = async () => {
    try {
      await action();
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    }
  };

  const modalContent = (
    <ModalContent>
      <p>
        This will replace the current active environment <Highlighted>{activeEnvironment}</Highlighted>
        <br />
        with the selected standby environment <Highlighted>{standbyEnvironment}</Highlighted>.
      </p>
      <p>Are you sure you want to do this?</p>
      <p>Upon confirmation you will be taken to the task page to monitor execution. </p>
    </ModalContent>
  );

  return (
    <React.Fragment>
      {contextHolder}
      <Button size="middle" type="primary" onClick={openModal} test-id="switch">
        Switch Active/Standby environments
      </Button>

      <Modal
        title={<Text>Confirm action</Text>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={handleCancel}
        onOk={confirmSwitch}
        confirmLoading={loading}
      >
        <ConfirmModalWrapper>{modalContent}</ConfirmModalWrapper>
      </Modal>
    </React.Fragment>
  );
};

export default ActiveStandbyConfirm;
