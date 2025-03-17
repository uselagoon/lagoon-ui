'use client';

import { useRouter } from 'next/navigation';

import { EnvironmentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/(environment-overview)/page';
import EnvironmentNotFound from '@/components/errors/EnvironmentNotFound';
import deleteEnvironment from '@/lib/mutation/deleteEnvironment';
import switchActiveStandby from '@/lib/mutation/switchActiveStandby';
import { QueryRef, useMutation, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { DetailedStats, Head3, Head4, Text } from '@uselagoon/ui-library';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import gitUrlParse from 'git-url-parse';

import ActiveStandbyConfirm from '../../activestandbyconfirm/ActiveStandbyConfirm';
import DeleteConfirm from '../../deleteConfirm/DeleteConfirm';
import { StyledGitLink } from '../projectDetails/styles';
import LimitedRoutes from './_components/LimitedRoutes';
import { EnvironmentActions, RoutesSection } from './styles';

dayjs.extend(utc);

// active/standby routes
export const createLinks = (routes: string | null) =>
  // just the first two routes
  routes
    ?.split(',')
    .slice(0, 2)
    .map(route => (
      <a href={route} target="_blank" key={route}>
        {route}
      </a>
    ));

export default function EnvironmentPage({
  queryRef,
  environmentSlug,
}: {
  queryRef: QueryRef<EnvironmentData>;
  environmentSlug: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const router = useRouter();

  const [deleteEnvironmentMutation, { data, loading: deleteLoading }] = useMutation(deleteEnvironment);

  const [switchActiveStandbyMutation, { loading: switchLoading }] = useMutation(switchActiveStandby);

  if (!environment) {
    return <EnvironmentNotFound openshiftProjectName={environmentSlug} />;
  }

  let gitUrlParsed;

  try {
    gitUrlParsed = gitUrlParse(environment.project.gitUrl);
  } catch {
    gitUrlParsed = null;
  }

  const gitBranchLink = gitUrlParsed
    ? `${gitUrlParsed.resource}/${gitUrlParsed.full_name}/${
        environment.deployType === 'branch'
          ? `tree/${environment.name}`
          : `pull/${environment.name.replace(/pr-/i, '')}`
      }`
    : '';

  const environmentDetailItems = [
    {
      children: environment.environmentType,
      key: 'env_type',
      label: 'Environment type',
      lowercaseValue: true,
    },
    {
      children: environment.deployType,
      key: 'deployment_type',
      label: 'Deployment Type',
      lowercaseValue: true,
    },
    {
      children: dayjs.utc(environment.created).local().format('YYYY-MM-DD HH:mm:ss Z'),
      key: 'created',
      label: 'Created',
      lowercaseValue: true,
    },
    {
      children: dayjs.utc(environment.updated).local().format('YYYY-MM-DD HH:mm:ss Z'),
      key: 'updated',
      label: 'Updated',
      lowercaseValue: true,
    },
    ...(gitBranchLink
      ? [
          {
            children: (
              <StyledGitLink className="hover-state" data-cy="source" target="_blank" href={`https://${gitBranchLink}`}>
                {gitBranchLink}
              </StyledGitLink>
            ),
            lowercaseValue: true,
            key: 'source',
            label: 'Source',
          },
        ]
      : []),
  ];

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
      <DetailedStats items={environmentDetailItems} />
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
      <Head3>Environment details</Head3>
      <section>{environmentDetails}</section>

      <RoutesSection>
        <Head3>Routes</Head3>

        {routes ? (
          <>
            <Head4>Active routes</Head4>
            <LimitedRoutes routes={routes} />
          </>
        ) : null}

        <br />
        {standbyRoutes ? (
          <>
            <Head4>Standby routes</Head4>
            <LimitedRoutes routes={standbyRoutes} />
          </>
        ) : null}

        {envHasNoRoutes && <Text>No routes found for {environment.name}</Text>}
      </RoutesSection>
    </>
  );
}
