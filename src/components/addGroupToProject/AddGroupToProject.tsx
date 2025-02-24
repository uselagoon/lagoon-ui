import { FC, startTransition, useState } from 'react';

import addProjectToGroup from '@/lib/mutation/organizations/addProjectToGroup';
import { PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { CreateButton, EditModalTitle, EditModalWrapper } from '../pages/organizations/organization/_components/styles';

type Props = {
  projectName: string;
  groups: {
    id: string;
    name: string;
  }[];
  refetch?: () => void;
};

/**
 * Link group to project modal
 */

export const AddGroupToProject: FC<Props> = ({ projectName, groups, refetch }) => {
  const [addGroup, { error, loading }] = useMutation(addProjectToGroup, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem linking a group.`,
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [linkGroupForm] = useForm();

  const groupOptions = groups.map(g => {
    return { label: g.name, value: g.name };
  });

  const handleAddGroup = async () => {
    const { group } = linkGroupForm.getFieldsValue();

    try {
      await addGroup({
        variables: {
          projectName,
          groupName: group,
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
    linkGroupForm.resetFields();
    setConfirmDisabled(true);
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const getRequiredFieldsValues = () => {
    const values: Record<string, string | boolean> = linkGroupForm.getFieldsValue(true);

    const requiredValues: {
      group: string;
    } = {} as { group: string };

    const requiredItems = ['group'] as const;

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
      <Tooltip placement="bottom" title="Link a group to this project">
        <CreateButton $variant="small" onClick={openModal}>
          <PlusOutlined data-cy="link-group" className="icon" /> <span className="text">Link group</span>
        </CreateButton>
      </Tooltip>

      <Modal
        title={<EditModalTitle>Link Group</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Link"
        onCancel={closeModal}
        onOk={handleAddGroup}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        width={600}
        styles={{ body: { minHeight: '120px' } }}
      >
        <EditModalWrapper>
          <Form
            form={linkGroupForm}
            onFieldsChange={() => {
              const fields = getRequiredFieldsValues();
              setConfirmDisabled(!!!fields);
            }}
          >
            <div className="addFields">
              <div className="wrap">
                <FormItem name="group" label="Group" rules={[{ required: true, message: '' }]}>
                  <Select
                    data-cy="group-select"
                    options={groupOptions}
                    placeholder="Select a group to link to this project"
                    defaultOpen={false}
                    onChange={val => {
                      linkGroupForm.setFieldValue('group', val);
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
