import DeleteNoConfirm from '@/components/deleteNoConfirm/DeleteNoConfirm';
import removeGroupFromProject from '@/lib/mutation/organizations/removeGroupFromProject';
import { useMutation } from '@apollo/client';

type GroupProject = {
  id: number;
  name: string;
};

type UnlinkGroupMemberProps = {
  groupName: string;
  project: GroupProject;
  refetch: () => void;
};

export const UnlinkGroupProject: React.FC<UnlinkGroupMemberProps> = ({ groupName, project, refetch }) => {
  const [unlinkProject, { loading }] = useMutation(removeGroupFromProject, {
    variables: {
      groupName,
      projectName: project.name,
    },
  });

  return (
    <DeleteNoConfirm
      deleteType="unlink"
      deleteItemType="project"
      title="Are you sure ?"
      loading={loading}
      deleteMessage={
        <>
          <p>
            This action will unlink project <span className="highlight">{project.name}</span> from group{' '}
            <span className="highlight">{groupName}</span>.
          </p>
        </>
      }
      action={() => unlinkProject()}
      refetch={refetch}
    />
  );
};
