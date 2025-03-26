import DeleteConfirm from '@/components/deleteConfirm/DeleteConfirm';
import deleteProject from '@/lib/mutation/organizations/deleteProject';
import { useMutation } from '@apollo/client';

type Project = {
  groupCount?: number;
  id: number;
  name: string;
};

type RemoveProjectProps = {
  project: Project;
  refetch: () => void;
};

export const RemoveProject: React.FC<RemoveProjectProps> = ({ project, refetch }) => {
  const [removeOrgProject, { data, loading }] = useMutation(deleteProject, {
    variables: {
      project: project.name,
    },
  });

  return (
    <>
      <DeleteConfirm
        deleteType="project"
        deleteName={project.name}
        loading={loading}
        data={data}
        action={() => removeOrgProject()}
        renderAsButton={false}
        refetch={refetch}
      />
    </>
  );
};
