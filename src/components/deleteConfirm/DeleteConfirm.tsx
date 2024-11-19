import React, { FC, ReactNode, useState } from 'react';

import { ApolloError } from '@apollo/client';
import { Button, FormItem, Input, Modal, Text, useNotification } from '@uselagoon/ui-library';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { FormItemWrapper, Highlighted } from '../projectVariables/_components/styles';
import { ConfirmModalWrapper, ModalContent } from './styles';

interface DeleteProps {
  deleteType: string;
  deleteName: string;
  deleteMessage?: string;
  icon?: ReactNode;
  action: () => void | any | Promise<any>;
  loading: boolean;
  data?: Record<string, any> | null;
}

/**
 * Confirms the deletion of the specified name and type.
 */

export const DeleteConfirm: FC<DeleteProps> = ({
  deleteType,
  deleteName,
  deleteMessage,
  icon,
  loading,
  action,
  data,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmForm] = useForm();
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem deleting environment.',
    placement: 'top',
    duration: 0,
    content: null,
  });

  const handleCancel = () => {
    setModalOpen(false);
    confirmForm.resetFields();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const confirmAction = async () => {
    try {
      await action();
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    }
  };
  const modalContent = (
    <ModalContent>
      <div className="inputs">
        <Form
          form={confirmForm}
          onFieldsChange={() => {
            const confirmValue = confirmForm.getFieldValue('confirm_text');
            setConfirmDisabled(!(confirmValue === deleteName));
          }}
        >
          {deleteMessage ? (
            <p>{deleteMessage}</p>
          ) : (
            <p>
              This will delete all resources associated with the {deleteType} <Highlighted>{deleteName}</Highlighted>{' '}
              and cannot be undone. Make sure this is something you really want to do!
            </p>
          )}

          <p>Type the name of the {deleteType} to confirm.</p>

          <FormItemWrapper>
            <div className="variable-wrap">
              <FormItem
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                name="confirm_text"
              >
                <Input />
              </FormItem>
            </div>
          </FormItemWrapper>
        </Form>
      </div>
    </ModalContent>
  );

  return (
    <React.Fragment>
      {contextHolder}
      <Button size="middle" danger iconBefore={icon} onClick={openModal} test-id="delete">
        Delete
      </Button>

      <Modal
        title={<Text>Confirm deletion</Text>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText={data ? 'Success' : 'Delete'}
        onCancel={handleCancel}
        onOk={confirmAction}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        dangerConfirm
      >
        <ConfirmModalWrapper>{modalContent}</ConfirmModalWrapper>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteConfirm;
