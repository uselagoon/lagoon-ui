import { FC, startTransition, useState } from 'react';

import deleteEnvVariableByName from '@/lib/mutation/deleteEnvVariableByName';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Text } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';
import { Form, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';

import {
  ContentWrapper,
  DeleteVariableButton,
  FormItemWrapper,
  Highlighted,
  ModalWrapper,
  NewVariableTitle,
} from '../pages/projectVariables/_components/styles';

type Props = {
  currentEnv: Variable;
  refetch: () => void;
  projectName: string;
} & (
  | {
      type: 'project';
    }
  | {
      type: 'environment';
      environmentName: string;
    }
);

export const DeleteVariableModal: FC<Props> = ({ currentEnv, projectName, refetch, type, ...rest }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteVariableForm] = useForm();
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [deleteVariableMutation, { loading }] = useMutation(deleteEnvVariableByName, {
    onError: err => {
      console.error(err);
    },
  });

  let envName = '';

  if (type === 'environment') {
    envName = (rest as { environmentName: string }).environmentName;
  }

  const modalContent = (
    <ContentWrapper>
      <div className="inputs">
        <Form
          form={deleteVariableForm}
          onFieldsChange={() => {
            const confirmValue = deleteVariableForm.getFieldValue('variable_name');
            setConfirmDisabled(!(confirmValue === currentEnv.name));
          }}
        >
          <Text>
            Confirm the name of the variable <Highlighted>{currentEnv.name}</Highlighted> to delete
          </Text>
          <FormItemWrapper>
            <div className="variable-wrap">
              <FormItem
                className="vertical-form-item"
                required
                rules={[{ required: true, message: '' }]}
                label="Variable name"
                name="variable_name"
              >
                <Input placeholder="Variable Name" />
              </FormItem>
            </div>
          </FormItemWrapper>
        </Form>
      </div>
    </ContentWrapper>
  );

  const deleteVariable = (name: string) => {
    return deleteVariableMutation({
      variables: {
        input: {
          // conditionally include environment
          project: projectName,
          ...(envName ? { environment: envName } : {}),
          name,
        },
      },
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
    deleteVariableForm.resetFields();
  };

  const handleCreateVariable = () => {
    const { variable_name } = deleteVariableForm.getFieldsValue();

    deleteVariable(variable_name).then(() => {
      startTransition(async () => {
        await refetch();
        handleCancel();
      });
    });
  };

  return (
    <>
      <DeleteVariableButton onClick={() => setModalOpen(true)}>
        <Tooltip placement="bottom" title="Delete variable">
          <DeleteOutlined />
        </Tooltip>
      </DeleteVariableButton>
      <Modal
        title={<NewVariableTitle>Delete a variable</NewVariableTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Delete"
        onCancel={handleCancel}
        onOk={handleCreateVariable}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        dangerConfirm
      >
        <ModalWrapper>{modalContent}</ModalWrapper>
      </Modal>
    </>
  );
};
