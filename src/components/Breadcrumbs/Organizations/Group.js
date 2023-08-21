import React from 'react';
import { getLinkData } from 'components/link/Organizations/Group';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';

const GroupBreadcrumb = ({ groupSlug, organizationSlug, organizationName, loading }) => {
  const linkData = getLinkData(groupSlug, organizationSlug, organizationName);

  return (
    <Breadcrumb
      header="Group"
      title={groupSlug}
      loading={loading}
      {... linkData}
    />
  );
};

export default GroupBreadcrumb;
