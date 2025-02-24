import { FC, startTransition, useState } from 'react';

import addUserToOrganization from '@/lib/mutation/organizations/addUserToOrganization';
import { EditOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { EditModalTitle, EditModalWrapper } from '../../organization/_components/styles';
import { adminRoleSelect } from './filterOptions';

type Props = {
  orgId: number;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    admin: true | null;
    owner: true | null;
    groupRoles:
      | {
          id: string;
        }[]
      | null;
  };
  refetch?: () => void;
};

/**
 * Edit user modal for organization administrators;
 */

export const EditUser: FC<Props> = ({ orgId, refetch, user }) => {
  const [addAdministrator, { error, loading }] = useMutation(addUserToOrganization, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem updating administrator role`,
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
      await addAdministrator({
        variables: {
          email: user.email,
          organization: orgId,
          ...(role === 'admin' && { admin: true }),
          ...(role === 'owner' && { owner: true }),
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
    } = {} as any;

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

  const getDefaultUserRole = () => {
    if (user.owner) {
      return 'owner';
    }
    if (user.admin) {
      return 'admin';
    }
    return 'viewer';
  };

  const initialRoleSelect = getDefaultUserRole();

  return (
    <>
      <Tooltip placement="bottom" title="Update administrator type">
        <EditOutlined data-cy="update-user" onClick={openModal} />
      </Tooltip>

      <Modal
        title={<EditModalTitle>Update Administrator</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Update"
        onCancel={closeModal}
        onOk={handleAddUser}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        width={800}
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
                <FormItem label="User email">
                  <Input placeholder="Enter email" value={user.email} disabled />
                </FormItem>
              </div>

              <div className="wrap">
                <FormItem name="role" label="Update a role" rules={[{ required: true, message: '' }]}>
                  <Select
                    data-cy="user-role"
                    options={adminRoleSelect}
                    placeholder="Update a role for this user"
                    defaultOpen={false}
                    defaultValue={initialRoleSelect}
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
