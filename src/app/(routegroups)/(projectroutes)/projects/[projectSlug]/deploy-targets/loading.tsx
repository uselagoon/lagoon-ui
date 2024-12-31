'use client';

import { LoadingSkeleton, Table } from '@uselagoon/ui-library';

const { DefaultTable } = Table;
export default function Loading() {
  const deployTargetColumns = [
    {
      title: 'Deploy Target Name',
      dataIndex: 'name',
      key: 'deploy_target_name',
      render: () => <LoadingSkeleton height={30} />,
    },
    {
      title: 'Branches Enabled ',
      dataIndex: 'branches',
      key: 'branches_enabled',
      render: () => <LoadingSkeleton height={30} />,
    },

    {
      title: 'Pull Requests Enabled',
      key: 'pull_requests_enabled',
      dataIndex: 'pullRequests',
      render: () => <LoadingSkeleton height={30} />,
    },
  ];

  const skeletonCount = Math.floor((window.innerHeight * 8) / 10 / 40);

  const skeletons = [...Array(skeletonCount)].map((_, index) => ({
    key: `deploy-target-skeleton-${index}`,
  }));

  return <DefaultTable columns={deployTargetColumns} dataSource={skeletons} />;
}
