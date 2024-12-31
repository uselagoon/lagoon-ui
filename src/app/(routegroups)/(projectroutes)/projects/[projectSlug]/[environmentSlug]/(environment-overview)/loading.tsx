'use client';

import { EnvironmentActions, RoutesSection } from '@/components/pages/environment/styles';
import { DetailedStats, Head3, Head4, LoadingSkeleton } from '@uselagoon/ui-library';

export default function Loading() {
  const environmentDetailSkeletonItems = [
    {
      children: <LoadingSkeleton width={60} />,
      key: 'env_type',
      label: 'Environment type',
    },
    {
      children: <LoadingSkeleton width={50} />,
      key: 'deployment_type',
      label: 'Deployment Type',
    },
    {
      children: <LoadingSkeleton width={80} />,
      key: 'created',
      label: 'Created',
    },
    {
      children: <LoadingSkeleton width={80} />,
      key: 'updated',
      label: 'Updated',
    },
  ];

  const routeSkeletons = Array.from({ length: 4 }).map(() => <LoadingSkeleton width={'60%'} />);
  return (
    <>
      <Head3>Environment details</Head3>
      <DetailedStats items={environmentDetailSkeletonItems} />

      <EnvironmentActions>
        <Head4>Actions</Head4>
        <LoadingSkeleton width={60} />
      </EnvironmentActions>
      <RoutesSection>
        <Head3>Routes</Head3>
        <>
          <Head4>Active routes</Head4>

          {routeSkeletons}
        </>
        <br />
        <>
          <Head4>Standby routes</Head4>
          {routeSkeletons}
        </>
      </RoutesSection>
    </>
  );
}
