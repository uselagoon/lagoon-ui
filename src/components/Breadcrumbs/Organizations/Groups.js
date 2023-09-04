import React from 'react';
import { getLinkData } from 'components/link/Organizations/Groups';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';

const GroupsBreadcrumb = ({ organizationSlug, organizationName }) => {
  const linkData = getLinkData(organizationSlug, organizationName);

  return (
    <Breadcrumb
      header="Groups"
      title="Groups"
      {... linkData}
    />
  );
};

export default GroupsBreadcrumb;
