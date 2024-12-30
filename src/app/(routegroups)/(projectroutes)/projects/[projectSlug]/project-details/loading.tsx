'use client';

import { DetailedStats, LoadingSkeleton } from '@uselagoon/ui-library';

export default function Loading() {
  const detailItems = [
    {
      key: 'created',
      label: 'CREATED',
      children: <LoadingSkeleton width={100} />,
    },
    {
      key: 'origin',
      label: 'ORIGIN',
      children: <LoadingSkeleton width={100} />,
    },
    {
      key: 'giturl',
      label: 'GIT URL',
      children: <LoadingSkeleton width={150} />,
    },
    {
      key: 'branches',
      label: 'BRANCHES ENABLED',
      children: <LoadingSkeleton width={50} />,
    },
    {
      key: 'pulls',
      label: 'PULL REQUESTS ENABLED',
      children: <LoadingSkeleton width={50} />,
    },
    {
      key: 'dev_envs',
      label: 'DEVELOPMENT ENVIRONMENTS IN USE',
      children: <LoadingSkeleton width={50} />,
    },
  ];
  return <DetailedStats items={detailItems} />;
}
