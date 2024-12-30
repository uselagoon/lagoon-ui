'use client';

import { RoutesSection } from '@/components/pages/environment/styles';
import { Collapse, DetailedStats, Head2, Head3, Head4, LoadingSkeleton } from '@uselagoon/ui-library';

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
    {
      children: <LoadingSkeleton width={100} />,
      key: 'routes',
      label: 'Routes 1',
    },
  ];

  const routeSkeletons = Array.from({ length: 4 }).map(() => <LoadingSkeleton width={'60%'} />);
  return (
    <>
      <Collapse
        type="default"
        items={[
          {
            children: <DetailedStats items={environmentDetailSkeletonItems} />,
            key: 1,
            label: <Head3>Environment details</Head3>,
          },
        ]}
      />

      <RoutesSection>
        <Head2>Routes</Head2>

        <Collapse
          type="default"
          size="small"
          useArrowIcons
          items={[
            {
              children: routeSkeletons,
              key: 'routes',
              label: <Head4>Environment routes</Head4>,
            },
          ]}
        />

        <Collapse
          type="default"
          size="small"
          useArrowIcons
          items={[
            {
              children: routeSkeletons,
              key: 'active_routes',
              label: <Head4>Active routes</Head4>,
            },
          ]}
        />

        <Collapse
          type="default"
          size="small"
          useArrowIcons
          items={[
            {
              children: routeSkeletons,
              key: 'standby_routes',
              label: <Head4>Standby routes</Head4>,
            },
          ]}
        />
      </RoutesSection>
    </>
  );
}
