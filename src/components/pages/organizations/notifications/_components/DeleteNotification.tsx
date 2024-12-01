import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import {
  REMOVE_NOTIFICATION_EMAIL,
  REMOVE_NOTIFICATION_ROCKETCHAT,
  REMOVE_NOTIFICATION_SLACK,
  REMOVE_NOTIFICATION_TEAMS,
  REMOVE_NOTIFICATION_WEBHOOK,
} from '@/lib/mutation/organizations/deleteNotification';
import { DocumentNode, useMutation } from '@apollo/client';

type Notification = {
  name: string;
  type: 'slack' | 'rocketchat' | 'teams' | 'email' | 'webhook';
};

type DeleteNotificationProps = {
  notification: Notification;
  refetch: () => void;
};

export const getNotificationMutation = (type: string) => {
  switch (type) {
    case 'slack':
      return REMOVE_NOTIFICATION_SLACK;
    case 'webhook':
      return REMOVE_NOTIFICATION_WEBHOOK;
    case 'rocketchat':
      return REMOVE_NOTIFICATION_ROCKETCHAT;
    case 'email':
      return REMOVE_NOTIFICATION_EMAIL;
    case 'teams':
      return REMOVE_NOTIFICATION_TEAMS;
  }
};

export const DeleteNotification: React.FC<DeleteNotificationProps> = ({ notification, refetch }) => {
  const mutationToUse = getNotificationMutation(notification.type) as DocumentNode;

  const [removeNotification, { loading }] = useMutation(mutationToUse, {
    variables: {
      name: notification.name,
    },
  });

  return (
    <>
      <DeleteNoConfirm
        deleteType="delete"
        deleteItemType="notification"
        title="Delete notification ?"
        loading={loading}
        deleteMessage={
          <>
            <p>
              This action will delete notification <span className="highlight">{notification.name}</span>.
            </p>
          </>
        }
        action={() => removeNotification()}
        refetch={refetch}
      />
    </>
  );
};
