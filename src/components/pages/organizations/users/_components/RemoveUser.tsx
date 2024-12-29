import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import removeUserFromOrganization from '@/lib/mutation/organizations/removeUserFromOrganization';
import { useMutation } from '@apollo/client';

type GroupMemberUser = {
  firstName: string | null;
  lastName: string | null;
  email: string;
};

type RemoveUserProps = {
  orgId: number;
  user: GroupMemberUser;
  refetch: () => void;
};

export const RemoveUser: React.FC<RemoveUserProps> = ({ orgId, user, refetch }) => {
  const [removeUser, { loading }] = useMutation(removeUserFromOrganization, {
    variables: {
      email: user.email,
      organization: orgId,
    },
  });

  return (
    <DeleteNoConfirm
      deleteType="remove"
      deleteItemType="user"
      title="Remove user?"
      loading={loading}
      deleteMessage={
        <>
          <p>
            This action will remove user <span className="highlight">{user.email}</span> from all groups in this
            organization, you might not be able to reverse this.
          </p>
        </>
      }
      action={() => removeUser()}
      refetch={refetch}
    />
  );
};
