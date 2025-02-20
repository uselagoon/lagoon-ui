import React, { FC, ReactNode, startTransition, useState } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { ApolloError } from '@apollo/client';
import { Button, FormItem, Input, Modal, Text, useNotification } from '@uselagoon/ui-library';
import { Form, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { FormItemWrapper, Highlighted } from '../pages/projectVariables/_components/styles';
import { ConfirmModalWrapper, ModalContent } from './styles';

interface DeleteProps {
  deleteType: string;
  deleteName: string;
  deleteMessage?: string;
  icon?: ReactNode;
  renderAsButton?: boolean;
  action: () => void | any | Promise<any>;
  refetch?: () => void;
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
  refetch,
  data,
  renderAsButton = true,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmForm] = useForm();
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem deleting ${deleteType}.`,
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
      startTransition(() => {
        (refetch ?? (() => {}))();
      });
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
                data-cy='input-confirm'
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
      {!renderAsButton ? (
        <Tooltip placement="bottom" title={`Delete ${deleteType}`}>
          <DeleteOutlined data-cy="delete" onClick={openModal} />
        </Tooltip>
      ) : (
        <Button size="middle" danger iconBefore={icon} onClick={openModal} testId="delete">
          Delete
        </Button>
      )}

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
        <ConfirmModalWrapper data-cy="delete-confirm">{modalContent}</ConfirmModalWrapper>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteConfirm;
