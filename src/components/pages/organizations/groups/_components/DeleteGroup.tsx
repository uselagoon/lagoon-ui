import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import deleteGroup from '@/lib/mutation/organizations/deleteGroup';
import { useMutation } from '@apollo/client';

type Group = {
  id: string;
  memberCount: number;
  name: string;
  type: 'null' | 'project-default-group';
};

type DeleteGroupModalProps = {
  group: Group;
  refetch: () => void;
};

export const DeleteGroup: React.FC<DeleteGroupModalProps> = ({ group, refetch }) => {
  const { name } = group;
  const [deleteGroupMutation, { loading }] = useMutation(deleteGroup, {
    variables: {
      groupName: name,
    },
  });

  return (
    <DeleteNoConfirm
      deleteType="delete"
      deleteItemType="group"
      title='Delete group ?'
      loading={loading}
      deleteMessage={
        <>
          <p>
            This action will delete group <span className="highlight">{name}</span> from this organization.
          </p>
        </>
      }
      action={() => deleteGroupMutation()}
      refetch={refetch}
    />
  );
};
