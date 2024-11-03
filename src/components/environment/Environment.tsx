'use client';

import { EnvironmentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/(environment-overview)/page';
import { Collapse, Details, Head2, Head3, Head4, Text } from '@uselagoon/ui-library';

import { RoutesSection, RoutesWrapper } from './styles';

export default function Environment({ environment }: { environment: EnvironmentData['environment'] }) {
  const environmentDetailItems = [
    {
      children: environment.environmentType,
      key: 'env_type',
      label: 'Environment type',
    },
    {
      children: environment.deployType,
      key: 'deployment_type',
      label: 'Deployment Type',
    },
    {
      children: environment.created,
      key: 'created',
      label: 'Created',
    },
    {
      children: environment.updated,
      key: 'updated',
      label: 'Updated',
    },
  ];
  // push multiple routes into the collapse items array
  environment?.routes?.split(',').forEach((route: string, idx: number) => {
    environmentDetailItems.push({
      children: route,
      key: 'routes',
      label: `Routes ${idx + 1}`,
    });
  });

  // active/standby routes
  const createLinks = (routes: string | null) =>
    routes?.split(',').map(route => (
      <a href={route} target="_blank" key={route}>
        {route}
      </a>
    ));

  const activeRoutes = createLinks(environment.project.productionRoutes);
  const standbyRoutes = createLinks(environment.project.standbyRoutes);
  const envHasNoRoutes = !activeRoutes && !standbyRoutes;
  return (
    <>
      <Collapse
        type="default"
        borderless
        items={[
          {
            children: <Details bordered layout="vertical" type="default" items={environmentDetailItems} />,
            key: 'environment_details',
            label: <Head3>Environment details</Head3>,
          },
        ]}
      />

      <RoutesSection>
        <Head2>Routes</Head2>

        {activeRoutes ? (
          <Collapse
            type="default"
            size="small"
            useArrowIcons
            items={[
              {
                children: <RoutesWrapper>{activeRoutes}</RoutesWrapper>,
                key: 'active_routes',
                label: <Head4>Active routes</Head4>,
              },
            ]}
          />
        ) : null}

        {standbyRoutes ? (
          <Collapse
            type="default"
            size="small"
            useArrowIcons
            items={[
              {
                children: <RoutesWrapper>{standbyRoutes}</RoutesWrapper>,
                key: 'standby_routes',
                label: <Head4>Standby routes</Head4>,
              },
            ]}
          />
        ) : null}
        {envHasNoRoutes && <Text>No routes found for {environment.name}</Text>}
      </RoutesSection>
    </>
  );
}
