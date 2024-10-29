'use client';

import { EnvironmentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/page';
import { Collapse, Details, Head2, Head3, Head4 } from '@uselagoon/ui-library';

import { EditButton, EditName, EnvironmentName, EnvironmentNameLabel, RoutesSection, RoutesWrapper } from './styles';

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
  // push multiple routes into the collapse items
  environment.routes.split(',').forEach((route: string, idx: number) => {
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

  return (
    <>
      <EnvironmentNameLabel>ENVIRONMENT NAME</EnvironmentNameLabel>
      <EditName>
        <EnvironmentName>{environment.name}</EnvironmentName> <EditButton />
      </EditName>

      <Collapse
        type="default"
        defaultActiveKey={1}
        items={[
          {
            children: <Details bordered type="topToBottom" items={environmentDetailItems} />,
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
          items={[
            {
              children: <RoutesWrapper>{createLinks(environment.project.productionRoutes)}</RoutesWrapper>,
              key: 'active_routes',
              label: <Head4>Active routes</Head4>,
            },
          ]}
        />

        <Collapse
          type="default"
          size="small"
          items={[
            {
              children: <RoutesWrapper>{createLinks(environment.project.standbyRoutes)}</RoutesWrapper>,
              key: 'standby_routes',
              label: <Head4>Standby routes</Head4>,
            },
          ]}
        />
      </RoutesSection>
    </>
  );
}
