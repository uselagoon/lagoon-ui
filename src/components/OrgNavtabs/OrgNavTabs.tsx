'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Tabs } from '@uselagoon/ui-library';

import { LinkContentWrapper } from '../shared/styles';

export const OrgNavTabs = ({ children }: { children: ReactNode }) => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const pathname = usePathname();

  return (
    <>
      <Tabs
        type="navigation"
        pathname={pathname}
        items={[
          {
            key: 'overview',
            label: (
              <Link href={`/organizations/${organizationSlug}`}>
                <LinkContentWrapper>Overview</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'groups',
            label: (
              <Link href={`/organizations/${organizationSlug}/groups`}>
                <LinkContentWrapper>Groups</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'users',
            label: (
              <Link href={`/organizations/${organizationSlug}/users`}>
                <LinkContentWrapper>Users</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'projects',
            label: (
              <Link href={`/organizations/${organizationSlug}/projects`}>
                <LinkContentWrapper>Projects</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'notifications',
            label: (
              <Link href={`/organizations/${organizationSlug}/notifications`}>
                <LinkContentWrapper>Notifications</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'manage',
            label: (
              <Link href={`/organizations/${organizationSlug}/manage`}>
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
