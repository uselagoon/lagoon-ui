import { FC, startTransition, useState } from 'react';

import addGroupMember from '@/lib/mutation/organizations/addGroupMember';
import { InfoCircleOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { Checkbox, FormItem, Input, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import {
  CreateButton,
  EditModalTitle,
  EditModalWrapper,
  LabelTooltip,
} from '../pages/organizations/organization/_components/styles';
import { orgUserRoleOptions } from '../shared/selectOptions';

type Props = {
  groupName: string;
  variant: 'button' | 'icon';
  refetch?: () => void;
};

/**
 * Add user modal for organization groups/group;
 */

export const AddUserToGroup: FC<Props> = ({ groupName, variant, refetch }) => {
  const [addGroupMemberMutation, { error, loading }] = useMutation(addGroupMember, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem adding a user to group ${groupName}.`,
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [addUserForm] = useForm();

  const handleAddUser = async () => {
    const { email, role, inviteUser } = addUserForm.getFieldsValue();

    try {
      await addGroupMemberMutation({
        variables: {
          email,
          role,
          group: groupName,
          inviteUser,
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
      inviteUser: boolean;
    } = {} as any;

    const requiredItems = ['email', 'role', 'inviteUser'] as const;

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
      {variant === 'icon' ? (
        <Tooltip placement="bottom" title="Add a user to the group">
          <UserAddOutlined onClick={openModal} />
        </Tooltip>
      ) : (
        <Tooltip placement="bottom" title="Add a user to the group">
          <CreateButton $variant="small" onClick={openModal}>
            <PlusOutlined className="icon" /> <span className="text">Add user</span>
          </CreateButton>
        </Tooltip>
      )}

      <Modal
        title={<EditModalTitle>Add user</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Confirm"
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
                <FormItem name="email" label="New user email" rules={[{ required: true, message: '' }]}>
                  <Input placeholder="Enter email" required />
                </FormItem>
              </div>

              <div className="wrap">
                <FormItem name="role" label="Add a role" rules={[{ required: true, message: '' }]}>
                  <Select
                    options={orgUserRoleOptions}
                    placeholder="Add a role for this user"
                    defaultOpen={false}
                    onChange={val => {
                      addUserForm.setFieldValue('role', val);
                    }}
                    size="middle"
                  />
                </FormItem>
              </div>

              <div>
                <FormItem
                  name="inviteUser"
                  valuePropName="checked"
                  label={
                    <LabelTooltip>
                      Invite user to Lagoon{' '}
                      <Tooltip
                        className="explainer"
                        placement="right"
                        title="This will invite the user to Lagoon if the user doesn't exist. If the user already exists, it will just skip the invite."
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </LabelTooltip>
                  }
                  initialValue={true}
                  rules={[{ required: true, message: '' }]}
                >
                  <Checkbox defaultChecked />
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
