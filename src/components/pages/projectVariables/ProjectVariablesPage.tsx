'use client';

import { Fragment, useState } from 'react';

import { ProjectEnvironmentsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/project-variables/page';
import ProjectNotFound from '@/components/errors/ProjectNotFound';
import projectByNameWithEnvVarsValueQuery from '@/lib/query/projectByNameWithEnvVarsValueQuery';
import { QueryRef, useLazyQuery, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Button, Head2, Table, useNotification } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';

import { AddNewVariable } from '../../addNewVariable/AddNewVariable';
import { DeleteVariableModal } from '../../deleteVariable/DeleteVariableModal';
import { Space } from '../environmentVariables/_components/styles';
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

  const [projectVarsVisible, setProjectVarsVisible] = useState(false);

  if (!project) {
    return <ProjectNotFound projectName={projectName} />;
  }

  const variables = project.envVariables;

  const [getPrjEnvVarValues, { loading: prjLoading, data: prjEnvValues }] = useLazyQuery(
    projectByNameWithEnvVarsValueQuery,
    {
      variables: { name: projectName },
      onError: err => {
        console.error(err);
        projectVarsError.trigger();
      },
      onCompleted: () => setProjectVarsVisible(true),
    }
  );

  const handleShowProjectVars = async () => {
    if (projectVarsVisible) {
      setProjectVarsVisible(false);
      return;
    }
    await getPrjEnvVarValues();
  };

  const projectVarsError = useNotification({
    type: 'error',
    title: 'Unauthorized',
    content:
      "You don't have permission to view project variable values. Contact your administrator to obtain the relevant permissions",
    requiresManualClose: true,
  });

  return (
    <>
      <Fragment key="projectVarsError-notification-holder"> {projectVarsError.contextHolder}</Fragment>
      <Head2>Project variables</Head2>

      <Button size="middle" loading={prjLoading} onClick={handleShowProjectVars}>
        {projectVarsVisible ? 'Hide values' : 'Show values'}
      </Button>

      <Space />

      <VariablesTable
        type="project"
        withValues={!prjLoading && prjEnvValues?.project?.envVariables && projectVarsVisible ? true : false}
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
        variables={prjEnvValues?.project?.envVariables || (variables as Variable[])}
      />
    </>
  );
}
