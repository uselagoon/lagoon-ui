'use client';

import { ProjectEnvironmentsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/project-variables/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head2, Table } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';

import { AddNewVariable } from '../addNewVariable/AddNewVariable';
import { DeleteVariableModal } from '../deleteVariable/DeleteVariableModal';
import { EditVariable } from './_components/EditVariable';

const { VariablesTable } = Table;
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
      <VariablesTable
        type="project"
        editVariableModal={currentVariable => (
          <EditVariable type="project" currentEnv={currentVariable} projectName={projectName} refetch={refetch} />
        )}
        deleteVariableModal={currentVariable => (
          <DeleteVariableModal
            type="project"
            currentEnv={currentVariable}
            projectName={projectName}
            refetch={refetch}
          />
        )}
        newVariableModal={<AddNewVariable type="project" projectName={projectName} refetch={refetch} />}
        variables={variables as Variable[]}
      />
    </>
  );
}
