import { ChangeEvent, FC, useState } from 'react';

import addGroupToOrganization from '@/lib/mutation/organizations/addGroupToOrganization';
import { PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Tip, useNotification } from '@uselagoon/ui-library';

import {
  CreateButton,
  EditModalTitle,
  EditModalWrapper,
  TipWrapper,
} from '../pages/organizations/organization/_components/styles';
import { ModalSubtitle } from '../pages/projectVariables/_components/styles';

interface Props {
  organizationId: number;
  existingGroupNames: string[];
}
export const CreateGroup: FC<Props> = ({ organizationId, existingGroupNames }) => {
  const [addGroupMutation, { error, loading }] = useMutation(addGroupToOrganization, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem creating a group.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [groupName, setGroupName] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    const allowedChars = /^[a-z0-9-]*$/;
    if (!allowedChars.test(newVal)) {
      return;
    }
    setGroupName(e.target.value);
  };

  const handleAddGroup = async () => {
    try {
      await addGroupMutation({
        variables: {
          group: groupName,
          organization: organizationId,
        },
      });
      closeModal();
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    }
  };

  const closeModal = () => {
    setGroupName('');
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <CreateButton onClick={openModal}>
        <PlusOutlined className="icon" /> <span className="text">Create a new group</span>
      </CreateButton>
      <Modal
        title={<EditModalTitle>Add a group</EditModalTitle>}
        subTitle={<ModalSubtitle>Step 1 of 1</ModalSubtitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Create"
        onCancel={closeModal}
        onOk={handleAddGroup}
        confirmLoading={loading}
        confirmDisabled={
          !groupName || groupName === '' || groupName.indexOf(' ') > 0 || existingGroupNames.includes(groupName)
        }
      >
        <EditModalWrapper>
          <div className="wrap">
            <FormItem label="Group name" required>
              <Input placeholder="Enter name" value={groupName} onChange={handleChange} required />
            </FormItem>
          </div>

          <TipWrapper>
            <Tip content="Please note, that only lowercase alpha characters and “-” are available for group names. " />
          </TipWrapper>
        </EditModalWrapper>
        {contextHolder}
      </Modal>
    </>
  );
};
