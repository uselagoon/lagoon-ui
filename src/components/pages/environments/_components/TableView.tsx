import { FC } from 'react';

import { usePathname } from 'next/navigation';

import { ProjectData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import { NewEnvironment } from '@/components/newEnvironment/NewEnvironment';
import { RoutesWrapper } from '@/components/pages/environment/styles';
import { getHighestSeverityProblem, makeSafe } from '@/components/utils';
import { Table } from '@uselagoon/ui-library';

import { createLinks } from '../../environment/EnvironmentPage';
import { getEnvironmentQuickActions } from './helpers';

interface Props {
  project: ProjectData['project'];
  projectName: string;
  filterString: string;
  resultsPerPage: number;
  refetch: () => void;
}
const { EnvironmentsTable } = Table;
export const TableView: FC<Props> = ({ project, projectName, filterString, resultsPerPage, refetch }) => {
  const pathname = usePathname();
  const { environments } = project;
  const productionEnvironment = project.productionEnvironment;

  const sortedEnvironments = [
    environments.find(env => env.name === productionEnvironment),
    ...environments.filter(env => env.name !== productionEnvironment),
  ].filter(env => !!env);

  const envTableData = sortedEnvironments.map(environment => {
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

    const routesToUse =
      standbyEnvironment || activeEnvironment
        ? standbyEnvironment
          ? project.standbyRoutes
          : project.productionRoutes
        : environment.routes;

    return {
      name: environment.openshiftProjectName,
      title: environment.name,
      deployType: environment.deployType,
      status: getHighestSeverityProblem(environment.problems),
      activeRoutes: <RoutesWrapper>{createLinks(routesToUse)}</RoutesWrapper>,
      envType: envType as any,
      last_deployment: environment.updated ?? '',
      quickActions: getEnvironmentQuickActions(environment, projectName),
      region: environment.openshift?.cloudRegion ?? '',
    };
  });

  const newEnvironmentModal = <NewEnvironment renderType="listItem" projectName={projectName} refetch={refetch} />;

  return (
    <EnvironmentsTable
      basePath={pathname}
      filterString={filterString}
      resultsPerPage={resultsPerPage}
      environments={envTableData}
      newEnvironmentModal={newEnvironmentModal}
    />
  );
};
