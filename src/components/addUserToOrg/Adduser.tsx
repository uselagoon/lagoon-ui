import { FC, startTransition, useState } from 'react';

import addGroupMember from '@/lib/mutation/organizations/addGroupMember';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
import { ModalSubtitle } from '../pages/projectVariables/_components/styles';
import { orgUserRoleOptions } from '../shared/selectOptions';

type WithOptions = {
  type: 'multiple';
  groupOptions: {
    label: string;
    value: string;
  }[];
};

type WithGroupName = {
  type: 'single';
  groupName: string;
};

type Props = {
  variant?: 'default' | 'small';
  // if refetchQuery of "getOrganization" doesn't do enough.
  refetch?: () => void;
} & (WithGroupName | WithOptions);
/**
 * Add user modal for organizations;
 * Accepts either a single groupName option or an array of options
 */

export const AddUser: FC<Props> = props => {
  const [addGroupMemberMutation, { error, loading }] = useMutation(addGroupMember, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem adding a user.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [addUserForm] = useForm();

  const handleAddUser = async () => {
    const { email, group, role, inviteUser } = addUserForm.getFieldsValue();

    try {
      await addGroupMemberMutation({
        variables: {
          email,
          role,
          group,
          inviteUser,
        },
      });
      startTransition(() => {
        (props.refetch ?? (() => {}))();
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
      group: string;
      role: string;
      inviteUser: boolean;
    } = {} as any;

    const requiredItems = ['email', 'group', 'role', 'inviteUser'] as const;

    for (const key of requiredItems) {
      if (values[key] == undefined) {
        return false; // return false if any required field is undefined or null
      }
      //@ts-ignore
      requiredValues[key] = values[key];
    }

    return requiredValues;
  };

  const groupSelectOptions =
    props.type === 'multiple'
      ? props.groupOptions
      : [
          {
            name: props.groupName,
            value: props.groupName,
          },
        ];

  return (
    <>
      <CreateButton $variant={props.variant} onClick={openModal}>
        <PlusOutlined className="icon" /> <span className="text">Add user</span>
      </CreateButton>
      <Modal
        title={<EditModalTitle>Add users</EditModalTitle>}
        subTitle={<ModalSubtitle>Step 1 of 1</ModalSubtitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={closeModal}
        onOk={handleAddUser}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
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
                  <Input size="large" placeholder="Enter email" required />
                </FormItem>
              </div>

              <div className="wrap">
                <FormItem name="group" label="Add to a Group" rules={[{ required: true, message: '' }]}>
                  <Select
                    options={groupSelectOptions}
                    placeholder="Select a group"
                    defaultOpen={false}
                    onChange={val => {
                      addUserForm.setFieldValue('group', val);
                    }}
                    size="middle"
                  />
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
                      </Tooltip>{' '}
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
