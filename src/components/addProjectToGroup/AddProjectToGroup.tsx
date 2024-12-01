import { FC, startTransition, useState } from 'react';

import addProjectToGroup from '@/lib/mutation/organizations/addProjectToGroup';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { CreateButton, EditModalTitle, EditModalWrapper } from '../pages/organizations/organization/_components/styles';

type Props = {
  groupName: string;
  projects: {
    id: number;
    name: string;
  }[];
  refetch?: () => void;
};

/**
 * Add project to group modal
 */

export const AddProjectToGroup: FC<Props> = ({ groupName, projects, refetch }) => {
  const [addProjectToGroupMutation, { error, loading }] = useMutation(addProjectToGroup, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem adding a project.`,
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [addProjectForm] = useForm();

  const projectOptions = projects.map(p => {
    return { label: p.name, value: p.name };
  });

  const handleAddProject = async () => {
    const { project } = addProjectForm.getFieldsValue();

    try {
      await addProjectToGroupMutation({
        variables: {
          projectName: project,
          groupName,
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
    addProjectForm.resetFields();
    setConfirmDisabled(true);
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const getRequiredFieldsValues = () => {
    const values: Record<string, string | boolean> = addProjectForm.getFieldsValue(true);

    const requiredValues: {
      project: string;
    } = {} as { project: string };

    const requiredItems = ['project'] as const;

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
      <Tooltip placement="bottom" title="Add an existing project to this group">
        <CreateButton $variant="small" onClick={openModal}>
          <PlusOutlined className="icon" /> <span className="text">Add project</span>
        </CreateButton>
      </Tooltip>

      <Modal
        title={<EditModalTitle>Add Project</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Add"
        onCancel={closeModal}
        onOk={handleAddProject}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        width={600}
        styles={{ body: { minHeight: '120px' } }}
      >
        <EditModalWrapper>
          <Form
            form={addProjectForm}
            onFieldsChange={() => {
              const fields = getRequiredFieldsValues();
              setConfirmDisabled(!!!fields);
            }}
          >
            <div className="addFields">
              <div className="wrap">
                <FormItem name="project" label="Project" rules={[{ required: true, message: '' }]}>
                  <Select
                    options={projectOptions}
                    placeholder="Select a project to add to the group"
                    defaultOpen={false}
                    onChange={val => {
                      addProjectForm.setFieldValue('project', val);
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
