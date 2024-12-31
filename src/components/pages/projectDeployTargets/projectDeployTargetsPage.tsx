'use client';

import { ProjectDeployTargetsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/deploy-targets/page';
import { Table } from '@uselagoon/ui-library';

const { DefaultTable } = Table;

interface ProjectDetailsProps {
  project: ProjectDeployTargetsData['project'];
}

export default function ProjectDeployTargetsPage(props: ProjectDetailsProps) {
  const { project } = props;

  const deployTargetColumns = [
    {
      title: 'Deploy Target Name',
      dataIndex: 'name',
      key: 'deploy_target_name',
    },
    {
      title: 'Branches Enabled ',
      dataIndex: 'branches',
      key: 'branches_enabled',
    },

    {
      title: 'Pull Requests Enabled',
      key: 'pull_requests_enabled',
      dataIndex: 'pullRequests',
    },
  ];

  const deployTargetData = project.deployTargetConfigs.map(depTarget => {
    return {
      name:
        depTarget.deployTarget.friendlyName != null ? depTarget.deployTarget.friendlyName : depTarget.deployTarget.name,
      branches: depTarget.branches,
      pullRequests: depTarget.pullrequests,
    };
  });

  return <DefaultTable columns={deployTargetColumns} dataSource={deployTargetData} />;
}
