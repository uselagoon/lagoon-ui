import { FC, startTransition, useState } from 'react';

import addUserToOrganization from '@/lib/mutation/organizations/addUserToOrganization';
import { PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { CreateButton, EditModalTitle, EditModalWrapper } from '../../organization/_components/styles';
import { adminRoleSelect } from './filterOptions';

type Props = {
  orgId: number;
  owners: {
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
  }[];
  refetch?: () => void;
};

/**
 * Add user modal for organization administrators;
 */

export const AddUser: FC<Props> = ({ orgId, refetch, owners }) => {
  const [addAdministrator, { error, loading }] = useMutation(addUserToOrganization, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem adding an administrator`,
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [addUserForm] = useForm();

  const handleAddUser = async () => {
    const { email, role } = addUserForm.getFieldsValue();

    try {
      await addAdministrator({
        variables: {
          email,
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
      email: string;
      role: string;
    } = {} as any;

    const requiredItems = ['email', 'role'] as const;

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
      <Tooltip placement="bottom" title="Add an administrator">
        <CreateButton $variant="small" onClick={openModal}>
          <PlusOutlined className="icon" /> <span className="text">Add user</span>
        </CreateButton>
      </Tooltip>

      <Modal
        title={<EditModalTitle>{userAlreadyExists ? 'Edit' : 'Add'} Administrator</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText={userAlreadyExists ? 'Update' : 'Add'}
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

              const emailField = addUserForm.getFieldValue('email');
              setUserAlreadyExists(!!owners.find(o => o.email === emailField));

              setConfirmDisabled(!!!fields);
            }}
          >
            <div className="addFields">
              <div className="wrap">
                <FormItem name="email" label="User email" rules={[{ required: true, message: '' }]}>
                  <Input placeholder="Enter email" required />
                </FormItem>
              </div>

              <div className="wrap">
                <FormItem name="role" label="Select a role" rules={[{ required: true, message: '' }]}>
                  <Select
                    options={adminRoleSelect}
                    placeholder="Select a role for this user"
                    defaultOpen={false}
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
