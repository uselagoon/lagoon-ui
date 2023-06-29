import React from 'react';
import { getLinkData } from 'components/link/Organizations/Organization';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';

const OrganizationBreadcrumb = ({ organizationSlug, organizationName, loading}) => {
  const linkData = getLinkData(organizationSlug, organizationName);

  return (
    <Breadcrumb
      header="Organization"
      title={organizationName}
      loading={loading}
      {... linkData}
    />
  );
};

export default OrganizationBreadcrumb;
