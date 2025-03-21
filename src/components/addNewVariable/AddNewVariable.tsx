import { FC, startTransition, useState } from 'react';

import addOrUpdateEnvVariable from '@/lib/mutation/addOrUpdateEnvVariable';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Select } from '@uselagoon/ui-library';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import ModalTip from '../pages/projectVariables/_components/ModalTip';
import {
  ContentWrapper,
  FormItemWrapper,
  ModalWrapper,
  NewVariableTitle,
  ProjectVariablebutton,
  VariableSteps,
} from '../pages/projectVariables/_components/styles';

type Props = { onClick?: () => any; refetch: () => void } & (
  | {
      type: 'project';
      projectName: string;
    }
  | {
      type: 'environment';
      environmentName: string;
      projectName: string;
    }
  | {
      type: 'organization';
      orgName: string;
    }
);

const scopeOptions = [
  {
    label: 'Build',
    value: 'build',
  },
  {
    label: 'Runtime',
    value: 'runtime',
  },
  {
    label: 'Global',
    value: 'global',
  },
  {
    label: 'Container registry',
    value: 'container_registry',
  },
  {
    label: 'Internal container registry',
    value: 'internal_container_registry',
  },
];

export const AddNewVariable: FC<Props> = ({ type, refetch, onClick, ...rest }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addVariableForm] = useForm();
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  let envName = '';
  let orgName = '';
  let projectName = '';

  if (type === 'project') {
    projectName = (rest as { projectName: string }).projectName;
  }

  if (type === 'environment') {
    envName = (rest as { environmentName: string }).environmentName;
  }

  if (type === 'organization') {
    orgName = (rest as { orgName: string }).orgName;
  }

  const getRequiredFieldsValues = () => {
    const values = addVariableForm.getFieldsValue(true);
    const requiredValues = {};

    const requiredItems = ['variable_name', 'variable_scope', 'variable_value'];

    for (const key of requiredItems) {
      if (!values[key]) {
        return false; // return false if any required field is falsy
      }
      //@ts-ignore
      requiredValues[key] = values[key];
    }

    return requiredValues;
  };

  const [addVariable, { loading }] = useMutation(addOrUpdateEnvVariable, {
    onError: err => {
      console.error(err);
    },
  });

  const modalContent = (
    <ContentWrapper>
      <div className="inputs">
        <Form
          form={addVariableForm}
          onFieldsChange={() => {
            const fields = getRequiredFieldsValues();
            setConfirmDisabled(!!!fields);
          }}
        >
          <FormItemWrapper>
            <div className="variable-wrap">
              <FormItem
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable name"
                name="variable_name"
              >
                <Input data-cy="var-name" placeholder="Variable Name" />
              </FormItem>
            </div>

            <div className="variable-wrap">
              <FormItem
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable scope"
                name="variable_scope"
              >
                <Select
                  data-cy="select-scope"
                  options={scopeOptions}
                  value={scopeOptions[0].value}
                  placeholder="Select variable scope"
                  defaultOpen={false}
                  onSelect={val => {
                    addVariableForm.setFieldValue('variable_scope', val);
                  }}
                />
              </FormItem>
            </div>

            <div className="variable-wrap">
              <FormItem
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable value"
                name="variable_value"
              >
                <Input data-cy="var-value" placeholder="Variable value" />
              </FormItem>
            </div>
          </FormItemWrapper>
        </Form>
      </div>

      <div className="explainer">
        <ModalTip />
      </div>
    </ContentWrapper>
  );

  const createVariable = (name: string, scope: string, value: string) => {
    return addVariable({
      variables: {
        input: {
          ...(orgName ? { organization: orgName } : {}),
          ...(projectName ? { project: projectName } : {}),
          ...(envName ? { environment: envName } : {}),
          name,
          scope: scope.toUpperCase(),
          value,
        },
      },
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
    addVariableForm.resetFields();
  };

  const handleCreateVariable = () => {
    const { variable_name, variable_scope, variable_value } = addVariableForm.getFieldsValue();

    createVariable(variable_name, variable_scope, variable_value).then(() => {
      startTransition(async () => {
        await refetch();
        handleCancel();
      });
    });
  };

  return (
    <>
      <ProjectVariablebutton
        data-cy="add-variable"
        onClick={async () => {
          let hasError;
          if (onClick) {
            hasError = await onClick();
          }
          !hasError?.error && setModalOpen(true);
        }}
      >
        <PlusOutlined /> Add new variable
      </ProjectVariablebutton>
      <Modal
        title={<NewVariableTitle>Create a variable</NewVariableTitle>}
        subTitle={<VariableSteps>Step 1 of 1</VariableSteps>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Create"
        onCancel={handleCancel}
        onOk={handleCreateVariable}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
      >
        <ModalWrapper>{modalContent}</ModalWrapper>
      </Modal>
    </>
  );
};
