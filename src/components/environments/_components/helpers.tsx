import { ProjectEnvironment } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import DeployLatest from '@/components/deployments/_components/DeployLatest';
import { CarryOutOutlined } from '@ant-design/icons';

import { LinkContainer } from '../styles';

export const getEnvironmentQuickActions = (
  environment: ProjectEnvironment,
  quickLinks: JSX.Element[],
  projectName: string
) => {
  return [
    {
      sectionTitle: 'Jump to an Environment',
      sectionChildren: quickLinks,
    },
    {
      sectionTitle: 'Variables',
      sectionChildren: [
        <LinkContainer href={`/projects/${projectName}/${environment.openshiftProjectName}/environment-variables`}>
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
