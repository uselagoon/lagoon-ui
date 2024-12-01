import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import removeUserFromGroupById from '@/lib/mutation/organizations/removeUserFromGroupById';
import { useMutation } from '@apollo/client';

type Group = {
  id: string;
  name: string;
  role: 'GUEST' | 'DEVELOPER' | 'REPORTER' | 'MAINTAINER' | 'OWNER';
  groupType?: 'null' | 'project-default-group';
};

type UnlinkProps = {
  userEmail: string;
  userGroup: Group;
  refetch: () => void;
};

export const UnlinkGroup: React.FC<UnlinkProps> = ({ userGroup, userEmail, refetch }) => {
  const [unlinkUser, { loading }] = useMutation(removeUserFromGroupById, {
    variables: {
      groupId: userGroup.id,
      email: userEmail,
    },
  });

  return (
    <DeleteNoConfirm
      deleteType="unlink"
      deleteItemType="user"
      title="Are you sure ?"
      loading={loading}
      deleteMessage={
        <>
          <p>
            This action will unlink user <span className="highlight">{userEmail}</span> from group{' '}
            <span className="highlight">{userGroup.name}</span>.
          </p>
        </>
      }
      action={() => unlinkUser()}
      refetch={refetch}
    />
  );
};
