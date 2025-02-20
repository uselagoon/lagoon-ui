import { FC } from 'react';

import updateOrganizationDescription from '@/lib/mutation/organizations/updateOrganizationDescription';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, useNotification } from '@uselagoon/ui-library';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { EditModalTitle, EditModalWrapper } from './styles';

interface Props {
  orgId: number;
  orgDesc: string;
  modalOpen: boolean;
  closeModal: () => void;
}
export const EditDesc: FC<Props> = ({ orgId, orgDesc, modalOpen, closeModal }) => {
  const [updateOrgDesc, { loading, error }] = useMutation(updateOrganizationDescription, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem updating organization description.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [editDescForm] = useForm();

  const handleCancel = () => {
    editDescForm.resetFields();
    closeModal();
  };

  const handleUpdate = async () => {
    const description = editDescForm.getFieldValue('description');
    try {
      await updateOrgDesc({
        variables: {
          id: orgId,
          description,
        },
      });
      closeModal();
    } catch (err) {
      trigger({ content: (err as ApolloError).message });
    }
  };

  return (
    <Modal
      title={<EditModalTitle>Change Organization Description</EditModalTitle>}
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
        <Form form={editDescForm}>
          <div className="wrap">
            <FormItem name="description" initialValue={orgDesc} label="ORGANIZATION DESCRIPTION" required>
              <Input data-cy='edit-input'/>
            </FormItem>
          </div>
        </Form>
      </EditModalWrapper>
      {contextHolder}
    </Modal>
  );
};
