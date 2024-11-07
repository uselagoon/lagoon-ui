'use client';

import Link from 'next/link';

import { BreadCrumb } from '@uselagoon/ui-library';

export const BulkDeploymentsBreadcrumbs = () => {
  const breadcrumbItems = [
    {
      key: 'bulkdeployment',
      title: <Link href="">All Deployments</Link>,
    },
  ];

  return <BreadCrumb activeKey={'bulkdeployment'} items={breadcrumbItems} type="orgs" />;
};
