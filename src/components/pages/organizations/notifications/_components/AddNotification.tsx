import { FC, startTransition, useState } from 'react';

import {
  ADD_EMAIL_NOTIFICATION,
  ADD_MICROSOFTTEAMS_NOTIFICATION,
  ADD_ROCKETCHAT_NOTIFICATION,
  ADD_SLACK_NOTIFICATION,
  ADD_WEBHOOK_NOTIFICATION,
} from '@/lib/mutation/organizations/addNotification';
import { PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { CreateButton, EditModalTitle, EditModalWrapper } from '../../organization/_components/styles';
import { newNotificationOptions } from './filterOptions';

type AddNotificationProps = {
  orgId: number;
  refetch: () => void;
};

/**
 * Add notification to an organization.
 */

export const AddNotification: FC<AddNotificationProps> = ({ orgId, refetch }) => {
  const [newNotificationType, setNewNotificationType] = useState<
    'slack' | 'rocketchat' | 'teams' | 'email' | 'webhook'
  >();

  const [addSlack] = useMutation(ADD_SLACK_NOTIFICATION);
  const [addRocketChat] = useMutation(ADD_ROCKETCHAT_NOTIFICATION);
  const [addEmail] = useMutation(ADD_EMAIL_NOTIFICATION);
  const [addTeams] = useMutation(ADD_MICROSOFTTEAMS_NOTIFICATION);
  const [addWebhook] = useMutation(ADD_WEBHOOK_NOTIFICATION);

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem adding a notification.`,
    placement: 'top',
    duration: 0,
    content: '',
  });

  const [addNotificationForm] = useForm();

  const getAction = async ({
    name,
    channel,
    webhook,
    email,
  }: {
    name: string;
    channel?: string;
    webhook?: string;
    email?: string;
  }) => {
    switch (newNotificationType) {
      case 'slack':
        return await addSlack({
          variables: {
            organization: orgId,
            name,
            channel: channel,
            webhook: webhook,
          },
        });
      case 'rocketchat':
        return await addRocketChat({
          variables: {
            organization: orgId,
            name,
            channel: channel,
            webhook: webhook,
          },
        });
      case 'email':
        return await addEmail({
          variables: {
            organization: orgId,
            name,
            emailAddress: email,
          },
        });
      case 'teams':
        return await addTeams({
          variables: {
            organization: orgId,
            name,
            webhook: webhook,
          },
        });
      case 'webhook':
        return await addWebhook({
          variables: {
            organization: orgId,
            name,
            webhook: webhook,
          },
        });
      default:
        throw new Error('wrong notification type');
    }
  };

  const handleAddNotification = async () => {
    const { name, channel, webhook, email } = addNotificationForm.getFieldsValue();

    const mutationVars = { name, channel, webhook, email };

    try {
      setLoading(true);

      await getAction(mutationVars);

      startTransition(() => {
        (refetch ?? (() => {}))();
      });

      closeModal();
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    addNotificationForm.resetFields();

    setLoading(false);
    setNewNotificationType(undefined);
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Tooltip placement="bottom" title="Add a new notification">
        <CreateButton $variant="small" onClick={openModal}>
          <PlusOutlined className="icon" /> <span className="text">Add Notification</span>
        </CreateButton>
      </Tooltip>

      <Modal
        title={<EditModalTitle>Add Notification</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Add"
        onCancel={closeModal}
        onOk={handleAddNotification}
        confirmDisabled={!newNotificationType}
        confirmLoading={loading}
        width={600}
      >
        <EditModalWrapper>
          <Form form={addNotificationForm}>
            <div className="notificationFields">
              <div className="wrap">
                <FormItem name="notification_type" label="Select Service" rules={[{ required: true, message: '' }]}>
                  <Select
                    options={newNotificationOptions}
                    placeholder="Make a selection"
                    defaultOpen={false}
                    onChange={val => {
                      setNewNotificationType(val);
                      addNotificationForm.setFieldValue('notification_type', val);
                    }}
                    size="middle"
                  />
                </FormItem>
              </div>

              <div className="wrap">
                <FormItem name="name" label="Name" rules={[{ required: true, message: '' }]}>
                  <Input placeholder="Enter notification name" required />
                </FormItem>
              </div>

              {newNotificationType === 'email' ? (
                <div className="wrap">
                  <FormItem name="email" label="Email Address" rules={[{ required: true, message: '', type: 'email' }]}>
                    <Input placeholder="Enter email" required />
                  </FormItem>
                </div>
              ) : null}

              {newNotificationType && newNotificationType !== 'email' ? (
                <div className="wrap">
                  <FormItem name="webhook" label="Webhook" rules={[{ required: true, message: '' }]}>
                    <Input placeholder="Enter Webhook" required />
                  </FormItem>
                </div>
              ) : null}

              {newNotificationType === 'slack' || newNotificationType === 'rocketchat' ? (
                <div className="wrap">
                  <FormItem name="channel" label="Channel" rules={[{ required: true, message: '' }]}>
                    <Input placeholder="Enter channel" required />
                  </FormItem>
                </div>
              ) : null}
            </div>
          </Form>
        </EditModalWrapper>
        {contextHolder}
      </Modal>
    </>
  );
};
