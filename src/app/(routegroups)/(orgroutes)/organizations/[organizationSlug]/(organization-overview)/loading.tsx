'use client';

import { Description } from '@/components/pages/organizations/organization/_components/Description';
import { OrgActionsWrapper } from '@/components/pages/organizations/organization/_components/styles';
import { DetailedStats, Details, Head2, LoadingSkeleton } from '@uselagoon/ui-library';

export default function Loading() {
  const orgSkeletonItems = [
    {
      key: 'org_id',
      label: 'ORG ID',
      children: <LoadingSkeleton width={80} />,
    },
    {
      key: 'org_name',
      label: 'ORG NAME',
      children: <LoadingSkeleton width={80} />,
    },
    {
      key: 'groups',
      label: 'GROUPS',
      children: <LoadingSkeleton width={80} />,
    },
    {
      key: 'projects',
      label: 'PROJECTS',
      children: <LoadingSkeleton width={80} />,
    },
    {
      key: 'notifications',
      label: 'NOTIFICATIONS',
      children: <LoadingSkeleton width={80} />,
    },
    {
      key: 'environments',
      label: 'ENVIRONMENTS',
      children: <LoadingSkeleton width={80} />,
    },
    {
      key: 'dev_envs',
      label: 'AVAILABLE DEPLOY TARGETS',
      contentStyle: {
        padding: 0,
      },
      children: <LoadingSkeleton width={80} />,
    },
  ];

  return (
    <>
      <>
        <Head2>Organization Details</Head2>
        <Description loading />

        <Head2>Create</Head2>

        <OrgActionsWrapper>
          <LoadingSkeleton width={120} height={60} />
          <LoadingSkeleton width={120} height={60} />
          <LoadingSkeleton width={120} height={60} />
        </OrgActionsWrapper>

        <DetailedStats items={orgSkeletonItems} />
      </>
    </>
  );
}
