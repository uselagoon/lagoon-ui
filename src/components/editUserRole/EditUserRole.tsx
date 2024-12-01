import { FC, startTransition, useState } from 'react';

import addGroupMember from '@/lib/mutation/organizations/addGroupMember';
import { EditOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { EditModalTitle, EditModalWrapper } from '../pages/organizations/organization/_components/styles';
import { orgUserRoleOptions } from '../shared/selectOptions';

type Props = {
  groupName: string;
  email: string;
  currentRole: string;
  refetch?: () => void;
};

/**
 * Edit user role modal for organization group / user;
 */

export const EditUserRole: FC<Props> = ({ groupName, email, currentRole, refetch }) => {
  const [updateUser, { error, loading }] = useMutation(addGroupMember, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem changing user role.`,
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [addUserForm] = useForm();

  const handleAddUser = async () => {
    const { role } = addUserForm.getFieldsValue();

    try {
      await updateUser({
        variables: {
          email,
          role,
          group: groupName,
        },
      });
      startTransition(() => {
        (refetch ?? (() => {}))();
      });
      closeModal();
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    }
  };

  const closeModal = () => {
    addUserForm.resetFields();
    setConfirmDisabled(true);
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const getRequiredFieldsValues = () => {
    const values: Record<string, string | boolean> = addUserForm.getFieldsValue(true);

    const requiredValues: {
      role: string;
    } = {} as { role: string };

    const requiredItems = ['role'] as const;

    for (const key of requiredItems) {
      if (values[key] == undefined) {
        return false;
      }
      //@ts-ignore
      requiredValues[key] = values[key];
    }

    return requiredValues;
  };

  return (
    <>
      <Tooltip placement="bottom" title="Edit role">
        <EditOutlined onClick={openModal} />
      </Tooltip>
      <Modal
        title={<EditModalTitle>Edit user role</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={closeModal}
        onOk={handleAddUser}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        width={600}
      >
        <EditModalWrapper>
          <Form
            form={addUserForm}
            onFieldsChange={() => {
              const fields = getRequiredFieldsValues();
              setConfirmDisabled(!!!fields);
            }}
          >
            <div className="addFields">
              <div className="wrap">
                <FormItem label="Email">
                  <Input placeholder="Enter email" value={email} disabled />
                </FormItem>
              </div>

              <div className="wrap">
                <FormItem name="role" label="Add a role" rules={[{ required: true, message: '' }]}>
                  <Select
                    options={orgUserRoleOptions}
                    placeholder="Select a role for this user"
                    defaultOpen={false}
                    defaultValue={currentRole}
                    onChange={val => {
                      addUserForm.setFieldValue('role', val);
                    }}
                    size="middle"
                  />
                </FormItem>
              </div>
            </div>
          </Form>
        </EditModalWrapper>
        {contextHolder}
      </Modal>
    </>
  );
};
