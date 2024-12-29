import React, { FC, ReactNode, startTransition, useState } from 'react';

import { DeleteOutlined, DisconnectOutlined } from '@ant-design/icons';
import { ApolloError } from '@apollo/client';
import { Modal, Text, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';

import { ConfirmModalWrapper, ModalContent } from '../deleteConfirm/styles';
import { capitalize } from '../utils';

/**
 * Alternative to DeleteConfirm, but users do not need to enter the name of what they're deleting.
 */
interface DeleteProps {
  deleteType: 'delete' | 'unlink' | 'remove';
  deleteItemType: string;
  deleteConfirmText?: string;
  title: ReactNode;
  deleteMessage: ReactNode;
  action: () => void | any | Promise<any>;
  refetch?: () => void;
  loading: boolean;
}

const DeleteNoConfirm: FC<DeleteProps> = ({
  deleteType,
  deleteItemType,
  deleteConfirmText,
  title,
  deleteMessage,
  action,
  refetch,
  loading,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem performing ${deleteType} on ${deleteItemType}.`,
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

  const confirmAction = async () => {
    try {
      await action();

      startTransition(() => {
        (refetch ?? (() => {}))();
      });
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    }
  };

  return (
    <React.Fragment>
      {contextHolder}

      <Tooltip placement="bottom" title={`${capitalize(deleteType)} ${deleteItemType}`}>
        {deleteType === 'delete' || deleteType === 'remove' ? (
          <DeleteOutlined onClick={openModal} />
        ) : (
          <DisconnectOutlined onClick={openModal} />
        )}
      </Tooltip>

      <Modal
        title={<Text>{title}</Text>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText={deleteConfirmText ?? 'Confirm'}
        onCancel={handleCancel}
        onOk={confirmAction}
        confirmLoading={loading}
        dangerConfirm
        styles={{
          body: { minHeight: '120px' },
        }}
        style={{ top: 150 }}
        width={500}
      >
        <ConfirmModalWrapper>
          <ModalContent>{deleteMessage}</ModalContent>
        </ConfirmModalWrapper>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteNoConfirm;
