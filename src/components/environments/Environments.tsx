'use client';

import { SetStateAction, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LagoonCard, LagoonFilter } from '@uselagoon/ui-library';
import { useQueryState } from 'nuqs';

import { StyledEnvironmentsWrapper } from './styles';

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

  const prodEnvironment = environments.find((env: any) => env.name === productionEnvironment);
  const otherEnvironments = environments.filter((env: any) => env.name !== productionEnvironment);

  const sortedEnvironments = prodEnvironment ? [prodEnvironment, ...otherEnvironments] : otherEnvironments;

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
              status="low"
              projectName={projectName}
              deployType={environment.deployType}
              navigateTo={() => {
                push(`/projects/${projectName}/${environment.openshiftProjectName}`);
              }}
              isProd={productionEnvironment === environment.name}
            />
          );
        })}
        <LagoonCard type="new" />
      </StyledEnvironmentsWrapper>
    </>
  );
}
