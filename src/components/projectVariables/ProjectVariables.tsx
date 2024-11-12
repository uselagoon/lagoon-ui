'use client';

import { ProjectEnvironmentsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/project-variables/page';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head2, Table } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/ProjectVariablesTable/ProjectVariablesTable';

import { AddNewVariable } from './_components/AddNewVariable';
import { DeleteVariableModal } from './_components/DeleteVariableModal';
import { EditVariable } from './_components/EditVariable';

const { ProjectVariablesTable } = Table;
export default function ProjectVariablesPage({
  queryRef,
  projectName,
}: {
  queryRef: QueryRef<ProjectEnvironmentsData>;
  projectName: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { project },
  } = useReadQuery(queryRef);

  const variables = project.envVariables;

  return (
    <>
      <Head2>Project variables</Head2>
      <ProjectVariablesTable
        editVariableModal={currentVariable => (
          <EditVariable currentEnv={currentVariable} projectName={projectName} refetch={refetch} />
        )}
        deleteVariableModal={currentVariable => (
          <DeleteVariableModal currentEnv={currentVariable} projectName={projectName} refetch={refetch} />
        )}
        newVariableModal={<AddNewVariable projectName={projectName} refetch={refetch} />}
        variables={variables as Variable[]}
      />
    </>
  );
}
