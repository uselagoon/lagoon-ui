import { FC } from 'react';

import { useRouter } from 'next/navigation';

import {
  ProjectData,
  ProjectEnvironment,
} from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import { NewEnvironment } from '@/components/newEnvironment/NewEnvironment';
import { getHighestSeverityProblem, makeSafe } from '@/components/utils';
import { LagoonCard } from '@uselagoon/ui-library';

import { StyledEnvText, StyledEnvironmentsWrapper } from '../styles';
import { getEnvironmentQuickActions } from './helpers';

interface Props {
  project: ProjectData['project'];
  resultsPerPage: number;
  filterString: string;
  projectName: string;
  setResultsPerPage: (val: string) => void;
  refetch: () => void;
}

export const CardView: FC<Props> = ({
  project,
  projectName,
  filterString,
  resultsPerPage,
  refetch,
  setResultsPerPage,
}) => {
  const { environments } = project;
  const { push } = useRouter();

  const productionEnvironment = project.productionEnvironment;
  // always show prod environment first
  const sortedEnvironments = [
    environments.find((env: ProjectEnvironment) => env.name === productionEnvironment),
    ...environments.filter((env: ProjectEnvironment) => env.name !== productionEnvironment),
  ].filter(env => !!env);

  const filteredEnvironments = sortedEnvironments.filter(environment => {
    const filterLower = filterString.toLowerCase();

    return (
      environment.name.toLowerCase().includes(filterLower) ||
      environment.openshiftProjectName.toLowerCase().includes(filterLower) ||
      environment.deployType.toLowerCase().includes(filterLower) ||
      (environment.openshift?.cloudRegion?.toLowerCase().includes(filterLower) ?? false)
    );
  });

  // slice filteredEnvironments based on resultsPerPage
  const slicedEnvsByCount = filteredEnvironments.slice(0, resultsPerPage);

  const handleShowMore = () => {
    if (environments.length - slicedEnvsByCount.length > 5) {
      setResultsPerPage(String(resultsPerPage + 5));
      return;
    }

    // use the "maximum" selectable value
    setResultsPerPage(String(50));
  };
  return (
    <>
      <StyledEnvironmentsWrapper>
        {slicedEnvsByCount.map((environment: ProjectEnvironment) => {
          const showProblemIndicator = environment.project.problemsUi === 1;

          const activeEnvironment =
            project.productionEnvironment &&
            project.standbyProductionEnvironment &&
            project.productionEnvironment == makeSafe(environment.name);
          const standbyEnvironment =
            project.productionEnvironment &&
            project.standbyProductionEnvironment &&
            project.standbyProductionEnvironment == makeSafe(environment.name);

          const envType = activeEnvironment
            ? 'active production'
            : standbyEnvironment
            ? 'standby production'
            : environment.environmentType;

          return (
            <LagoonCard
              showProblemIndicator={showProblemIndicator}
              key={environment.openshiftProjectName}
              type="environment"
              title={environment.name}
              envType={envType as any}
              status={getHighestSeverityProblem(environment.problems)}
              projectName={projectName}
              environmentName={environment.openshiftProjectName}
              deployType={environment.deployType}
              quickActions={getEnvironmentQuickActions(environment, projectName)}
              region={environment.openshift?.cloudRegion ?? ''}
              navPath={`/projects/${projectName}/${environment.openshiftProjectName}`}
              navigateTo={() => {
                push(`/projects/${projectName}/${environment.openshiftProjectName}`);
              }}
            />
          );
        })}
        <NewEnvironment projectName={projectName} refetch={refetch} environmentCount={0} />
      </StyledEnvironmentsWrapper>

      {environments.length > slicedEnvsByCount.length ? (
        <StyledEnvText $button onClick={handleShowMore}>
          Show more...
        </StyledEnvText>
      ) : null}
      <StyledEnvText>
        Showing {slicedEnvsByCount.length} of {environments.length} Environments
      </StyledEnvText>
    </>
  );
};
