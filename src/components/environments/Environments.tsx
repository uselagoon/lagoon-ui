'use client';

import { SetStateAction, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Problem } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/problems/page';
import { CarryOutOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { LagoonCard, LagoonFilter } from '@uselagoon/ui-library';
import { useQueryState } from 'nuqs';

import DeployLatest from '../deployments/_components/DeployLatest';
import { getHighestSeverityProblem } from '../utils';
import { LinkContainer, StyledEnvironmentsWrapper } from './styles';

export default function ProjectEnvironments({
  environments,
  projectName,
  productionEnvironment,
}: {
  environments: any;
  projectName: string;
  productionEnvironment?: string;
}) {
  const [search, setSearch] = useQueryState('search');
  const [numberOfitems, setNumberOfItems] = useState(0);

  const { push } = useRouter();

  // always show prod environment first
  const sortedEnvironments = [
    environments.find((env: any) => env.name === productionEnvironment),
    ...environments.filter((env: any) => env.name !== productionEnvironment),
  ].filter(Boolean);

  // all the env links - same for every card
  const quickLinks = environments.map((env: any) => (
    <LinkContainer href={`/projects/${projectName}/${env.openshiftProjectName}`}>
      <PlayCircleOutlined />
      <span>{env.openshiftProjectName}</span>
    </LinkContainer>
  ));

  const getEnvironmentQuickActions = (environment: any) => {
    console.warn(environment);

    return [
      {
        sectionTitle: 'Jump to an Environment',
        sectionChildren: quickLinks,
      },
      {
        sectionTitle: 'Variables',
        sectionChildren: [
          <LinkContainer href={`/projects/${projectName}/${environment.openshiftProjectName}/variables`}>
            <CarryOutOutlined />
            <span>View and create project variables</span>
          </LinkContainer>,
        ],
      },
      {
        sectionTitle: 'Deploy',
        sectionChildren: [<DeployLatest environment={environment} renderAsQuickAction />],
      },
    ];
  };

  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
        selectOptions={{
          options: [
            {
              value: 10,
              label: '10 Results per page',
            },
            {
              value: 20,
              label: '20 Results per page',
            },
            {
              value: 50,
              label: '50 Results per page',
            },
          ],
          selectedState: numberOfitems,
          setSelectedState: setNumberOfItems as any,
        }}
      />
      <StyledEnvironmentsWrapper>
        {sortedEnvironments.map((environment: any) => {
          return (
            <LagoonCard
              key={environment.openshiftProjectName}
              type="environment"
              title={environment.name}
              envType={environment.environmentType}
              status={getHighestSeverityProblem(environment.problems)}
              projectName={projectName}
              environmentName={environment.openshiftProjectName}
              deployType={environment.deployType}
              quickActions={getEnvironmentQuickActions(environment)}
              navigateTo={() => {
                push(`/projects/${projectName}/${environment.openshiftProjectName}`);
              }}
            />
          );
        })}
        <LagoonCard type="new" />
      </StyledEnvironmentsWrapper>
    </>
  );
}
