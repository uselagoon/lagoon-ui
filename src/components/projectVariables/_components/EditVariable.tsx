import { FC, startTransition, useState } from 'react';

import addOrUpdateEnvVariable from '@/lib/mutation/addOrUpdateEnvVariable';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { FormItem, Input, Modal, Select } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/ProjectVariablesTable/ProjectVariablesTable';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import ModalTip from './ModalTip';
import {
  ContentWrapper,
  EditVariableButton,
  FormItemWrapper,
  ModalWrapper,
  NewVariableTitle,
  VariableSteps,
} from './styles';

type Props = {
  currentEnv: Variable;
  projectName: string;
  refetch: () => void;
};

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

export const EditVariable: FC<Props> = ({ currentEnv, projectName, refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addVariableForm] = useForm();
  const [confirmDisabled, setConfirmDisabled] = useState(true);

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

  const [addProjectVariable, { loading }] = useMutation(addOrUpdateEnvVariable, {
    onError: err => {
      console.error(err);
    },
    variables: {
      project: projectName,
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
                initialValue={currentEnv.name}
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable name"
                name="variable_name"
              >
                <Input placeholder="Variable Name" disabled />
              </FormItem>
            </div>

            <div className="variable-wrap">
              <FormItem
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable scope"
                name="variable_scope"
                initialValue={currentEnv.scope.toLowerCase()}
              >
                <Select
                  options={scopeOptions}
                  value={scopeOptions[0].value || currentEnv.scope.toLowerCase()}
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
                initialValue={currentEnv.value}
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable value"
                name="variable_value"
              >
                <Input placeholder="Variable value" />
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

  const createProjectVariable = (name: string, scope: string, value: string) => {
    return addProjectVariable({
      variables: {
        input: {
          project: projectName,
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

    createProjectVariable(variable_name, variable_scope, variable_value).then(() => {
      startTransition(async () => {
        await refetch();
        handleCancel();
      });
    });
  };

  return (
    <>
      <EditVariableButton onClick={() => setModalOpen(true)}>
        <EditOutlined />
      </EditVariableButton>
      <Modal
        title={<NewVariableTitle>Edit a variable</NewVariableTitle>}
        subTitle={<VariableSteps>Step 1 of 1</VariableSteps>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Update"
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
