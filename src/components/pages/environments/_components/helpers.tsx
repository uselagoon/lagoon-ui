import { ProjectEnvironment } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import DeployLatest from '@/components/pages/deployments/_components/DeployLatest';
import { CarryOutOutlined } from '@ant-design/icons';

import { LinkContainer } from '../styles';

export const getEnvironmentQuickActions = (environment: ProjectEnvironment, projectName: string) => {
  return [
    {
      sectionTitle: 'Variables',
      sectionChildren: [
        <LinkContainer href={`/projects/${projectName}/${environment.openshiftProjectName}/environment-variables`}>
          <CarryOutOutlined />
          <span>View and create environment variables</span>
        </LinkContainer>,
      ],
    },
    {
      sectionTitle: 'Deploy',
      sectionChildren: [<DeployLatest environment={environment} renderAsQuickAction />],
    },
  ];
};
