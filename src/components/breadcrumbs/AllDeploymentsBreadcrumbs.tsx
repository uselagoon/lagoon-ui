'use client';

import Link from 'next/link';

import { BreadCrumb } from '@uselagoon/ui-library';

export const AllDeploymentsBreadcrumbs = () => {
  const breadcrumbItems = [
    {
      key: 'alldeployments',
      title: <Link href="/alldeployments">All Deployments</Link>,
    },
  ];

  return <BreadCrumb activeKey="alldeployments" items={breadcrumbItems} type="orgs" />;
};
