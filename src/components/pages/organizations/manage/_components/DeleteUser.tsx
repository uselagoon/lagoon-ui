import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import removeOwner from '@/lib/mutation/organizations/removeOwner';
import { useMutation } from '@apollo/client';

type User = {
  email: string;
};

type DeleteUserModalProps = {
  user: User;
  orgId: number;
  orgName: string;
  refetch: () => void;
};

export const DeleteUser: React.FC<DeleteUserModalProps> = ({ user, orgId, orgName, refetch }) => {
  const { email } = user;
  const [deleteUser, { loading }] = useMutation(removeOwner, {
    variables: {
      email,
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
            This action will remove user <span className="highlight">{user.email}</span> from management of the
            organization <span className="highlight">{orgName}</span>.
          </p>
        </>
      }
      action={() => deleteUser()}
      refetch={refetch}
    />
  );
};
