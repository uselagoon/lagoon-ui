import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import removeNotificationFromProject from '@/lib/mutation/organizations/removeNotificationFromProject';
import { useMutation } from '@apollo/client';

type Notification = {
  name: string;
  type: string;
};

type UnlinkNotificationModalProps = {
  notification: Notification;
  projectName: string;
  refetch: () => void;
};

export const getNotificationType = (type: string) => {
  switch (type) {
    case 'slack':
      return 'SLACK';
    case 'webhook':
      return 'WEBHOOK';
    case 'rocketchat':
      return 'ROCKETCHAT';
    case 'email':
      return 'EMAIL';
    case 'teams':
      return 'MICROSOFTTEAMS';
    default:
      return undefined;
  }
};
export const UnlinkNotification: React.FC<UnlinkNotificationModalProps> = ({ notification, projectName, refetch }) => {
  const { name, type } = notification;

  const [unlinkNotification, { loading }] = useMutation(removeNotificationFromProject, {
    variables: {
      projectName,
      notificationType: getNotificationType(type),
      notificationName: name,
    },
  });

  return (
    <DeleteNoConfirm
      deleteType="unlink"
      deleteItemType="notification"
      title="Unlink notification ?"
      loading={loading}
      deleteMessage={
        <>
          <p>
            This action will unlink notification <span className="highlight">{name}</span> from project{' '}
            <span className="highlight">{projectName}</span>.
          </p>
        </>
      }
      action={() => unlinkNotification()}
      refetch={refetch}
    />
  );
};
