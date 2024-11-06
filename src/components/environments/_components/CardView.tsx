import { FC } from 'react';

import { useRouter } from 'next/navigation';

import {
  ProjectData,
  ProjectEnvironment,
} from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import { NewEnvironment } from '@/components/newEnvironment/NewEnvironment';
import { getHighestSeverityProblem, makeSafe } from '@/components/utils';
import { PlayCircleOutlined } from '@ant-design/icons';
import { LagoonCard } from '@uselagoon/ui-library';

import { LinkContainer, StyledEnvironmentsWrapper } from '../styles';
import { getEnvironmentQuickActions } from './helpers';

interface Props {
  project: ProjectData['project'];
  resultsPerPage: number;
  filterString: string;
  projectName: string;
  refetch: () => void;
}
export const CardView: FC<Props> = ({ project, projectName, filterString, resultsPerPage, refetch }) => {
  const { environments } = project;

  const { push } = useRouter();

  const productionEnvironment = project.productionEnvironment;
  // always show prod environment first
  const sortedEnvironments = [
    environments.find((env: ProjectEnvironment) => env.name === productionEnvironment),
    ...environments.filter((env: ProjectEnvironment) => env.name !== productionEnvironment),
  ].filter(env => !!env);

  const quickLinks = environments.map((env: ProjectEnvironment) => (
    <LinkContainer href={`/projects/${projectName}/${env.openshiftProjectName}`}>
      <PlayCircleOutlined />
      <span>{env.openshiftProjectName}</span>
    </LinkContainer>
  ));

  return (
    <StyledEnvironmentsWrapper>
      {sortedEnvironments.map((environment: ProjectEnvironment) => {
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
            key={environment.openshiftProjectName}
            type="environment"
            title={environment.name}
            envType={envType as any}
            status={getHighestSeverityProblem(environment.problems)}
            projectName={projectName}
            environmentName={environment.openshiftProjectName}
            deployType={environment.deployType}
            quickActions={getEnvironmentQuickActions(environment, quickLinks, projectName)}
            region={environment.openshift?.cloudRegion ?? ''}
            navigateTo={() => {
              push(`/projects/${projectName}/${environment.openshiftProjectName}`);
            }}
          />
        );
      })}
      <NewEnvironment projectName={projectName} refetch={refetch} />
    </StyledEnvironmentsWrapper>
  );
};
