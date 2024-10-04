'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { BreadCrumb } from '@uselagoon/ui-library';

export const OrgBreadcrumbs = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const activeKey = organizationSlug || 'organizations';
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
          },
        ]
      : []),
  ];

  return <BreadCrumb activeKey={activeKey} items={breadcrumbItems} type="orgs" />;
};
