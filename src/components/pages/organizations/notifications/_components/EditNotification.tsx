import { startTransition, useState } from 'react';

import {
  UPDATE_NOTIFICATION_EMAIL,
  UPDATE_NOTIFICATION_ROCKETCHAT,
  UPDATE_NOTIFICATION_SLACK,
  UPDATE_NOTIFICATION_TEAMS,
  UPDATE_NOTIFICATION_WEBHOOK,
} from '@/lib/mutation/organizations/updateNotification';
import { EditOutlined } from '@ant-design/icons';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';
import { FormItem, Input, Modal, useNotification } from '@uselagoon/ui-library';
import { Form, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { EditModalTitle, EditModalWrapper } from '../../organization/_components/styles';

export type Notification = {
  name: string;
  channel?: string;
  webhook?: string;
  emailAddress?: string;
  type: 'slack' | 'rocketchat' | 'teams' | 'email' | 'webhook';
};

type EditNotificationProps = {
  notification: Notification;
  refetch: () => void;
};

export const getNotificationMutation = (type: string) => {
  switch (type) {
    case 'slack':
      return UPDATE_NOTIFICATION_SLACK;
    case 'webhook':
      return UPDATE_NOTIFICATION_WEBHOOK;
    case 'rocketchat':
      return UPDATE_NOTIFICATION_ROCKETCHAT;
    case 'email':
      return UPDATE_NOTIFICATION_EMAIL;
    case 'teams':
      return UPDATE_NOTIFICATION_TEAMS;
  }
};

export const EditNotification: React.FC<EditNotificationProps> = ({ notification, refetch }) => {
  const mutationToUse = getNotificationMutation(notification.type) as DocumentNode;

  const [modalOpen, setModalOpen] = useState(false);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem updating notification.`,
    placement: 'top',
    duration: 0,
    content: '',
  });

  const [editNotificationForm] = useForm();

  const [updateNotification, { loading }] = useMutation(mutationToUse, {
    variables: {
      name: notification.name,
    },
  });

  const handleUpdateNotification = async () => {
    const { name, channel, webhook, email } = editNotificationForm.getFieldsValue();

    try {
      await updateNotification({
        variables: {
          patch: {
            ...(name ? { name } : {}),
            ...(channel ? { channel } : {}),
            ...(webhook ? { webhook } : {}),
            ...(email ? { emailAddress: email } : {}),
          },
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
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const editNotificationType = notification.type;

  return (
    <>
      <Tooltip placement="bottom" title="Edit notification">
        <EditOutlined data-cy="edit-notification" onClick={openModal} />
      </Tooltip>

      <Modal
        title={<EditModalTitle>Edit Notification</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Update"
        onCancel={closeModal}
        onOk={handleUpdateNotification}
        confirmLoading={loading}
        width={600}
      >
        <EditModalWrapper>
          <Form form={editNotificationForm}>
            <div className="notificationFields">
              <div className="wrap">
                <FormItem
                  name="name"
                  label="Name"
                  initialValue={notification.name}
                  rules={[{ required: true, message: '' }]}
                >
                  <Input data-cy="notification-name" placeholder="Enter notification name" required />
                </FormItem>
              </div>

              {editNotificationType === 'email' ? (
                <div className="wrap">
                  <FormItem
                    name="email"
                    initialValue={notification.emailAddress}
                    label="Email Address"
                    rules={[{ required: true, message: '', type: 'email' }]}
                  >
                    <Input data-cy="notification-email" placeholder="Enter email" required />
                  </FormItem>
                </div>
              ) : null}

              {editNotificationType && editNotificationType !== 'email' ? (
                <div className="wrap">
                  <FormItem
                    name="webhook"
                    initialValue={notification.webhook}
                    label="Webhook"
                    rules={[{ required: true, message: '' }]}
                  >
                    <Input data-cy="notification-webhook" placeholder="Enter Webhook" required />
                  </FormItem>
                </div>
              ) : null}

              {editNotificationType === 'slack' || editNotificationType === 'rocketchat' ? (
                <div className="wrap">
                  <FormItem
                    name="channel"
                    initialValue={notification.channel}
                    label="Channel"
                    rules={[{ required: true, message: '' }]}
                  >
                    <Input data-cy="notification-channel" placeholder="Enter channel" required />
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
