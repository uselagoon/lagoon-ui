'use client';

import { useRouter } from 'next/navigation';

import { EnvironmentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/(environment-overview)/page';
import deleteEnvironment from '@/lib/mutation/deleteEnvironment';
import switchActiveStandby from '@/lib/mutation/switchActiveStandby';
import { QueryRef, useMutation, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Collapse, Details, Head2, Head3, Head4, Text } from '@uselagoon/ui-library';

import ActiveStandbyConfirm from '../../activestandbyconfirm/ActiveStandbyConfirm';
import DeleteConfirm from '../../deleteConfirm/DeleteConfirm';
import { EnvironmentActions, RoutesSection, RoutesWrapper } from './styles';

// active/standby routes
export const createLinks = (routes: string | null) =>
  routes?.split(',').map(route => (
    <a href={route} target="_blank" key={route}>
      {route}
    </a>
  ));

export default function EnvironmentPage({ queryRef }: { queryRef: QueryRef<EnvironmentData> }) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const router = useRouter();

  const [deleteEnvironmentMutation, { data, loading: deleteLoading }] = useMutation(deleteEnvironment);

  const [switchActiveStandbyMutation, { loading: switchLoading }] = useMutation(switchActiveStandby);

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

  const routes = createLinks(environment.routes);
  const activeRoutes = createLinks(environment.project.productionRoutes);
  const standbyRoutes = createLinks(environment.project.standbyRoutes);
  const envHasNoRoutes = !routes && !activeRoutes && !standbyRoutes;

  const shouldRenderSwitchActiveStandby =
    environment.project.productionEnvironment &&
    environment.project.standbyProductionEnvironment &&
    environment.environmentType === 'production' &&
    environment.project.standbyProductionEnvironment === environment.name;

  const environmentDetails = (
    <>
      <Details bordered layout="vertical" type="default" items={environmentDetailItems} />

      <EnvironmentActions>
        <Head4>Actions</Head4>

        <section>
          {shouldRenderSwitchActiveStandby ? (
            <ActiveStandbyConfirm
              activeEnvironment={environment.project.productionEnvironment}
              standbyEnvironment={environment.project.standbyProductionEnvironment}
              action={() =>
                switchActiveStandbyMutation({
                  variables: {
                    input: {
                      project: {
                        name: environment.project.name,
                      },
                    },
                  },
                })
              }
              loading={switchLoading}
            />
          ) : null}

          <DeleteConfirm
            deleteType="environment"
            deleteName={environment.name}
            loading={deleteLoading}
            data={data}
            action={() =>
              deleteEnvironmentMutation({
                variables: {
                  input: {
                    name: environment.name,
                    project: environment.project.name,
                  },
                },
              })
                // go back to the refreshed project page
                .then(() => {
                  router.push(`/projects/${environment.project.name}`);
                })
                .then(() => router.refresh())
            }
          />
        </section>
      </EnvironmentActions>
    </>
  );
  return (
    <>
      <Collapse
        type="default"
        borderless
        items={[
          {
            children: environmentDetails,
            key: 'environment_details',
            label: <Head3>Environment details</Head3>,
          },
        ]}
      />

      <RoutesSection>
        <Head2>Routes</Head2>

        {routes ? (
          <Collapse
            type="default"
            size="small"
            useArrowIcons
            items={[
              {
                children: <RoutesWrapper>{routes}</RoutesWrapper>,
                key: 'routes',
                label: <Head4>Environment routes</Head4>,
              },
            ]}
          />
        ) : null}

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
