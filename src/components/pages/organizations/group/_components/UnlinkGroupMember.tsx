import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import removeUserFromGroup from '@/lib/mutation/organizations/removeUserFromGroup';
import { useMutation } from '@apollo/client';

type GroupMemberUser = {
  role: 'GUEST' | 'DEVELOPER' | 'REPORTER' | 'MAINTAINER' | 'OWNER';
  firstName: string | null;
  lastName: string | null;
  email: string;
};

type UnlinkGroupMemberProps = {
  groupName: string;
  user: GroupMemberUser;
  refetch: () => void;
};

export const UnlinkGroupMember: React.FC<UnlinkGroupMemberProps> = ({ groupName, user, refetch }) => {
  const [unlinkMember, { loading }] = useMutation(removeUserFromGroup, {
    variables: {
      groupName,
      email: user.email,
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
            This action will unlink user <span className="highlight">{user.email}</span> from group{' '}
            <span className="highlight">{groupName}</span>.
          </p>
        </>
      }
      action={() => unlinkMember()}
      refetch={refetch}
    />
  );
};
