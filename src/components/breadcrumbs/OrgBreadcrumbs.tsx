'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { BreadCrumb } from '@uselagoon/ui-library';

export const OrgBreadcrumbs = () => {
  const { organizationSlug, projectSlug, groupSlug, userSlug } = useParams<{
    organizationSlug: string;
    projectSlug?: string;
    groupSlug?: string;
    userSlug?: string;
  }>();

  const currentSlug = userSlug ? 'user' : groupSlug ? 'group' : projectSlug ? 'project' : undefined;

  const decodedUserSlug = userSlug && decodeURIComponent(userSlug);

  const activeKey = decodedUserSlug || groupSlug || projectSlug || organizationSlug || 'organizations';
  const breadcrumbItems = [
    {
      key: 'organizations',
      title: <Link href="/organizations">Organizations</Link>,
    },
    ...(organizationSlug
      ? [
          {
            key: organizationSlug,
            title: <Link href={`/organizations/${organizationSlug}`}>{organizationSlug}</Link>,
            copyText: organizationSlug,
          },
        ]
      : []),

    ...(groupSlug
      ? [
          {
            key: groupSlug,
            title: <Link href={`/organizations/${organizationSlug}/groups/${groupSlug}`}>{groupSlug}</Link>,
            copyText: groupSlug,
          },
        ]
      : []),

    ...(decodedUserSlug
      ? [
          {
            key: decodedUserSlug,
            title: <Link href={`/organizations/${organizationSlug}/users/${decodedUserSlug}`}>{decodedUserSlug}</Link>,
            copyText: decodedUserSlug,
          },
        ]
      : []),
    ...(projectSlug
      ? [
          {
            key: projectSlug,
            title: <Link href={`/organizations/${organizationSlug}/projects/${projectSlug}`}>{projectSlug}</Link>,
            copyText: projectSlug,
          },
        ]
      : []),
  ];

  return <BreadCrumb activeKey={activeKey} items={breadcrumbItems} type="orgs" currentSlug={currentSlug} />;
};
