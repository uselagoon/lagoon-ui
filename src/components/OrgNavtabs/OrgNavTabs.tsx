'use client';

import { ReactNode } from 'react';

import { useEnvContext } from 'next-runtime-env';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Tabs } from '@uselagoon/ui-library';

import { LinkContentWrapper } from '../shared/styles';

export const OrgNavTabs = ({ children }: { children: ReactNode }) => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const pathname = usePathname();

  const { LAGOON_UI_VIEW_ENV_VARIABLES } = useEnvContext();

  const showVariablesTab = LAGOON_UI_VIEW_ENV_VARIABLES == null ? true : false;
  return (
    <>
      <Tabs
        type="navigation"
        pathname={pathname}
        items={[
          {
            key: 'overview',
            label: (
              <Link data-cy="nav-org-overview" href={`/organizations/${organizationSlug}`}>
                <LinkContentWrapper>Overview</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'groups',
            label: (
              <Link data-cy="nav-groups" href={`/organizations/${organizationSlug}/groups`}>
                <LinkContentWrapper>Groups</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'users',
            label: (
              <Link data-cy="nav-users" href={`/organizations/${organizationSlug}/users`}>
                <LinkContentWrapper>Users</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'projects',
            label: (
              <Link data-cy="nav-org-projects" href={`/organizations/${organizationSlug}/projects`}>
                <LinkContentWrapper>Projects</LinkContentWrapper>
              </Link>
            ),
          },

          ...(showVariablesTab
            ? [
                {
                  key: 'variables',
                  label: (
                    <Link data-cy="nav-org-variables" href={`/organizations/${organizationSlug}/variables`}>
                      <LinkContentWrapper>Variables</LinkContentWrapper>
                    </Link>
                  ),
                },
              ]
            : []),

          {
            key: 'notifications',
            label: (
              <Link data-cy="nav-notifications" href={`/organizations/${organizationSlug}/notifications`}>
                <LinkContentWrapper>Notifications</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'manage',
            label: (
              <Link data-cy="nav-manage" href={`/organizations/${organizationSlug}/manage`}>
                <LinkContentWrapper>Administration</LinkContentWrapper>
              </Link>
            ),
          },
        ]}
      >
        {children}
      </Tabs>
    </>
  );
};

export default OrgNavTabs;
