import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Organizations/Organization';

interface Props {
  organizationSlug: string;
  organizationId: number;
  loading: boolean;
}

const OrganizationBreadcrumb = ({ organizationSlug, organizationId, loading }: Props) => {
  const linkData = getLinkData(organizationSlug, organizationId);
  return <Breadcrumb header="Organization" title={organizationSlug} loading={loading} {...linkData} />;
};

export default OrganizationBreadcrumb;
