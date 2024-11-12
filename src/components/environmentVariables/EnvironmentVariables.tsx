'use client';

// import { AddNewVariable } from './_components/AddNewVariable';
// import { DeleteVariableModal } from './_components/DeleteVariableModal';
// import { EditVariable } from './_components/EditVariable';
import { EnvVariablesData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/environment-variables/page';
import { ProjectEnvironmentsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/project-variables/page';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head2, Table } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/ProjectVariablesTable/ProjectVariablesTable';

const { ProjectVariablesTable } = Table;
export default function EnvironmentVariablesPage({
  queryRef,
  environmentName,
}: {
  queryRef: QueryRef<EnvVariablesData>;
  environmentName: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environmentVars },
  } = useReadQuery(queryRef);

  const variables = environmentVars.envVariables;

  return (
    <>
      <Head2>Environment variables</Head2>
      <ProjectVariablesTable
        editVariableModal={() => <></>}
        deleteVariableModal={() => <></>}
        newVariableModal={<></>}
        // editVariableModal={currentVariable => (
        //   <EditVariable currentEnv={currentVariable} projectName={projectName} refetch={refetch} />
        // )}
        // deleteVariableModal={currentVariable => (
        //   <DeleteVariableModal currentEnv={currentVariable} projectName={projectName} refetch={refetch} />
        // )}
        // newVariableModal={<AddNewVariable projectName={projectName} refetch={refetch} />}
        variables={variables as any}
      />
    </>
  );
}
