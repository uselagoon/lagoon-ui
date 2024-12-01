import { FC, startTransition, useState } from 'react';

import Link from 'next/link';

import addProjectToOrganization from '@/lib/mutation/organizations/addProjectToOrganization';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { Checkbox, FormItem, Input, Modal, Select, Tip, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import {
  CreateButton,
  EditModalTitle,
  EditModalWrapper,
  LabelTooltip,
  TipWrapper,
} from '../pages/organizations/organization/_components/styles';
import { ModalSubtitle } from '../pages/projectVariables/_components/styles';

interface Props {
  organizationId: number;
  options: {
    label: string;
    value: number;
  }[];
  variant?: 'default' | 'small';
  refetch?: () => void;
}
export const CreateProject: FC<Props> = ({ organizationId, options, refetch, variant = 'default' }) => {
  const [addProjectMutation, { error, loading }] = useMutation(addProjectToOrganization, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem creating a project.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [addProjectForm] = useForm();

  const handleAddProject = async () => {
    const { projectName, gitUrl, prodEnv, deployTarget, addUserToProject, pullRequests, branches } =
      addProjectForm.getFieldsValue();

    try {
      await addProjectMutation({
        variables: {
          organization: organizationId,
          name: projectName,
          gitUrl: gitUrl,
          kubernetes: parseInt(deployTarget, 10),
          productionEnvironment: prodEnv,
          addOrgOwner: addUserToProject,
          ...(pullRequests ? { pullrequests: pullRequests } : {}),
          ...(branches ? { branches } : {}),
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
      projectName: string;
      gitUrl: string;
      prodEnv: string;
      deployTarget: string;
      addUserToProject: boolean;
    } = {} as any;

    const requiredItems = ['projectName', 'gitUrl', 'gitUrl', 'prodEnv', 'deployTarget', 'addUserToProject'] as const;

    for (const key of requiredItems) {
      // @ts-ignore
      requiredValues[key] = values[key];
    }

    return requiredValues;
  };

  return (
    <>
      <CreateButton $variant={variant} onClick={openModal}>
        <PlusOutlined className="icon" /> <span className="text">Create a new project</span>
      </CreateButton>
      <Modal
        title={<EditModalTitle>Create a project</EditModalTitle>}
        subTitle={<ModalSubtitle>Step 1 of 1</ModalSubtitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Create"
        onCancel={closeModal}
        onOk={handleAddProject}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
      >
        <EditModalWrapper>
          <Form
            form={addProjectForm}
            onFieldsChange={() => {
              const { projectName, gitUrl, prodEnv, deployTarget } = getRequiredFieldsValues();
              setConfirmDisabled(
                projectName === '' ||
                  projectName?.indexOf(' ') > 0 ||
                  gitUrl === '' ||
                  gitUrl?.indexOf(' ') > 0 ||
                  prodEnv === '' ||
                  prodEnv?.indexOf(' ') > 0 ||
                  deployTarget == undefined
              );
            }}
          >
            <div className="addprojectmodal">
              <section className="addprojectfields">
                <div className="wrap">
                  <FormItem name="projectName" label="Project name" rules={[{ required: true, message: '' }]}>
                    <Input placeholder="Enter a project name" required />
                  </FormItem>
                </div>

                <div className="wrap">
                  <FormItem
                    name="gitUrl"
                    label={
                      <LabelTooltip>
                        Git URL{' '}
                        <Tooltip
                          className="explainer"
                          placement="right"
                          title="When using an SSH git URL make sure that you copy the full path and have permission to add a deploy key and webhook. Public repositories can also be used."
                        >
                          <InfoCircleOutlined />
                        </Tooltip>{' '}
                      </LabelTooltip>
                    }
                    rules={[{ required: true, message: '' }]}
                  >
                    <Input placeholder="Enter the URL" required />
                  </FormItem>
                </div>

                <div className="wrap">
                  <FormItem name="prodEnv" label="Production environment" rules={[{ required: true, message: '' }]}>
                    <Input placeholder="Enter prod environment" required />
                  </FormItem>
                </div>

                <div className="wrap">
                  <FormItem name="deployTarget" label="Deploy Target" rules={[{ required: true, message: '' }]}>
                    <Select
                      options={options}
                      placeholder="Select variable scope"
                      defaultOpen={false}
                      onChange={val => {
                        addProjectForm.setFieldValue('deployTarget', val);
                      }}
                    />
                  </FormItem>
                </div>

                <div className="wrap">
                  <FormItem
                    name="branches"
                    label={
                      <LabelTooltip>
                        Branches
                        <Tooltip
                          className="explainer"
                          title={
                            <>
                              <b>[Default: true]</b>
                              <br />
                              <span> Which branches should be deployed, can be one of:</span>
                              <ul style={{ paddingInlineStart: '12px' }}>
                                <li>true - all branches are deployed </li>

                                <li>false - no branches are deployed</li>

                                <li>
                                  regex of all branches that can be deployed (including production), example:
                                  '^(main|staging)$'
                                </li>
                              </ul>
                            </>
                          }
                          overlayInnerStyle={{ width: 500 }}
                          placement="right"
                        >
                          <InfoCircleOutlined />
                        </Tooltip>
                      </LabelTooltip>
                    }
                  >
                    <Input placeholder="Branches" />
                  </FormItem>
                </div>

                <div className="wrap">
                  <FormItem
                    name="pullRequests"
                    label={
                      <LabelTooltip>
                        Pull requests
                        <Tooltip
                          className="explainer"
                          title={
                            <>
                              <b>[Default: true]</b>
                              <br />
                              <span> Which pull requests should be deployed, can be one of:</span>
                              <ul style={{ paddingInlineStart: '12px' }}>
                                <li>true - all pull requests are deployed </li>

                                <li>false - no pull requests are deployed</li>

                                <li>regex of all Pull Request titles that can be deployed, example: '[BUILD]'</li>
                              </ul>
                            </>
                          }
                          placement="right"
                          overlayInnerStyle={{ width: 500 }}
                        >
                          <InfoCircleOutlined />
                        </Tooltip>
                      </LabelTooltip>
                    }
                  >
                    <Input placeholder="Pull requests" />
                  </FormItem>
                </div>

                <div>
                  <FormItem
                    name="addUserToProject"
                    valuePropName="checked"
                    label="Add my user to this project"
                    initialValue={true}
                    rules={[{ required: true, message: '' }]}
                  >
                    <Checkbox defaultChecked />
                  </FormItem>
                </div>
              </section>
              <TipWrapper className="tip">
                <Tip
                  content={
                    <>
                      Please note, once the project has been created you will need to add the{' '}
                      <a
                        target="_blank"
                        href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-deploy-key-to-your-git-repository"
                      >
                        Deploy Key{' '}
                      </a>
                      and{' '}
                      <a
                        target="_blank"
                        href="https://docs.lagoon.sh/installing-lagoon/add-project/#add-the-webhooks-endpoint-to-your-git-repository"
                      >
                        Webhook{' '}
                      </a>{' '}
                      to your Git service, these will be generated in the 'create environment' wizard available from the
                      project overview page."
                    </>
                  }
                />
              </TipWrapper>
            </div>
          </Form>
        </EditModalWrapper>
        {contextHolder}
      </Modal>
    </>
  );
};
