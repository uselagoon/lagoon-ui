import { FC, startTransition, useState } from 'react';

import {
  OrgEmail,
  OrgWebhook,
} from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/(organization-overview)/page';
import addNotificationToproject from '@/lib/mutation/organizations/addNotificationToproject';
import { PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import { FormItem, Modal, Select, useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';

import { CreateButton, EditModalTitle, EditModalWrapper } from '../../organization/_components/styles';

type BasicNotification = {
  name: string;
  type: string;
};

type Props = {
  projectName: string;
  allNotifications: ((OrgWebhook & { __typename: string }) | (OrgEmail & { __typename: string }))[];
  linkedNotifications: {
    slacks: any;
    webhooks: any;
    rocketChats: any;
    emails: any;
    teams: any;
  };

  refetch?: () => void;
};

/**
 * Link notification to project modal
 */

export const AddNotificationToProject: FC<Props> = ({
  projectName,
  linkedNotifications,
  allNotifications,
  refetch,
}) => {
  const [addNotification, { error, loading }] = useMutation(addNotificationToproject, {
    refetchQueries: ['getOrganization'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: `There was a problem linking a notification.`,
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [linkNotificationForm] = useForm();

  const linkedNotificationsNames = [
    ...linkedNotifications.slacks.map((notification: BasicNotification) => notification.name),
    ...linkedNotifications.webhooks.map((notification: BasicNotification) => notification.name),
    ...linkedNotifications.rocketChats.map((notification: BasicNotification) => notification.name),
    ...linkedNotifications.emails.map((notification: BasicNotification) => notification.name),
    ...linkedNotifications.teams.map((notification: BasicNotification) => notification.name),
  ];

  const filteredNotifications = allNotifications.filter(
    notification => !linkedNotificationsNames.includes(notification.name)
  );

  const notificationOptions = filteredNotifications.map(notification => {
    return {
      label: notification.__typename.split('Notification')[1].toLowerCase() + ': ' + notification.name,
      value: notification.__typename.split('Notification')[1].toUpperCase() + ':' + notification.name,
    };
  });

  const handleAddNotification = async () => {
    const { notification } = linkNotificationForm.getFieldsValue();

    try {
      await addNotification({
        variables: {
          projectName,
          notificationType: notification.split(':')[0],
          notificationName: notification.split(':')[1],
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
    linkNotificationForm.resetFields();
    setConfirmDisabled(true);
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const getRequiredFieldsValues = () => {
    const values: Record<string, string | boolean> = linkNotificationForm.getFieldsValue(true);

    const requiredValues: {
      notification: string;
    } = {} as { notification: string };

    const requiredItems = ['notification'] as const;

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
      <Tooltip placement="bottom" title="Link a notification to this project">
        <CreateButton $variant="small" onClick={openModal}>
          <PlusOutlined data-cy="link-notification" className="icon" /> <span className="text">Link notification</span>
        </CreateButton>
      </Tooltip>

      <Modal
        title={<EditModalTitle>Link Notification</EditModalTitle>}
        open={modalOpen}
        destroyOnClose
        cancelText="Cancel"
        confirmText="Link"
        onCancel={closeModal}
        onOk={handleAddNotification}
        confirmLoading={loading}
        confirmDisabled={confirmDisabled}
        width={600}
        styles={{ body: { minHeight: '120px' } }}
      >
        <EditModalWrapper>
          <Form
            form={linkNotificationForm}
            onFieldsChange={() => {
              const fields = getRequiredFieldsValues();
              setConfirmDisabled(!!!fields);
            }}
          >
            <div className="addFields">
              <div className="wrap">
                <FormItem name="notification" label="Notification" rules={[{ required: true, message: '' }]}>
                  <Select
                    data-cy="notification-select"
                    options={notificationOptions}
                    placeholder="Select a notification to link"
                    defaultOpen={false}
                    onChange={val => {
                      linkNotificationForm.setFieldValue('notification', val);
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
