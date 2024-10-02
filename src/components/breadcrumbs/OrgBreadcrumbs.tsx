'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { BreadCrumb } from '@uselagoon/ui-library';

export const OrgBreadcrumbs = () => {
  const pathname = usePathname();

  const params = useParams();

  return (
    <BreadCrumb
      activeKey="organizations"
      items={[
        {
          key: 'organizations',
          title: <Link href="/organizations">Organizations</Link>,
        },
        {
          key: 'tests',
          title: <Link href="/organizations/123"> Test</Link>,
        },
      ]}
      type="orgs"
    />
  );
};
