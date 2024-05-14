import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Organizations/Organization';

interface Props {
  organizationSlug: string;
  organizationId: number;
  loading: boolean;
  orgFriendlyName?: string;
}

const OrganizationBreadcrumb = ({ organizationSlug, organizationId, loading, orgFriendlyName = '' }: Props) => {
  const linkData = getLinkData(organizationSlug, organizationId, orgFriendlyName);
  return (
    <Breadcrumb header="Organization" title={orgFriendlyName || organizationSlug} loading={loading} {...linkData} />
  );
};

export default OrganizationBreadcrumb;
