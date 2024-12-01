import { FC } from 'react';

import updateOrganizationFriendlyName from '@/lib/mutation/organizations/updateOrganizationFriendlyName';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, useNotification } from '@uselagoon/ui-library';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { EditModalTitle, EditModalWrapper } from './styles';

interface Props {
  orgId: number;
  orgName: string;
  modalOpen: boolean;
  closeModal: () => void;
}
export const EditName: FC<Props> = ({ orgId, orgName, modalOpen, closeModal }) => {
  const [updateOrgName, { loading, error }] = useMutation(updateOrganizationFriendlyName, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem updating organization name.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [editNameForm] = useForm();

  const handleCancel = () => {
    editNameForm.resetFields();
    closeModal();
  };

  const handleUpdate = async () => {
    const friendlyName = editNameForm.getFieldValue('name');
    try {
      await updateOrgName({
        variables: {
          id: orgId,
          friendlyName,
        },
      });
      closeModal();
    } catch (err) {
      trigger({ content: (err as ApolloError).message });
    }
  };

  return (
    <Modal
      title={<EditModalTitle>Change Organization Name</EditModalTitle>}
      open={modalOpen}
      destroyOnClose
      cancelText="Cancel"
      confirmText="Continue"
      onCancel={handleCancel}
      onOk={handleUpdate}
      confirmLoading={loading}
      styles={{ body: { minHeight: '120px' } }}
      width={600}
    >
      <EditModalWrapper>
        <Form form={editNameForm}>
          <div className="wrap">
            <FormItem name="name" initialValue={orgName} label="ORGANIZATION NAME" required>
              <Input />
            </FormItem>
          </div>
        </Form>
      </EditModalWrapper>
      {contextHolder}
    </Modal>
  );
};
