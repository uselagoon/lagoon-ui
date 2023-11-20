import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Organizations/Group';

interface Props {
  groupSlug: string;
  organizationSlug: string;
  organizationId: number;
  loading: boolean;
}

const GroupBreadcrumb = ({ groupSlug, organizationSlug, organizationId, loading }: Props) => {
  const linkData = getLinkData(groupSlug, organizationSlug, organizationId);

  return <Breadcrumb header="Group" title={groupSlug} loading={loading} {...linkData} />;
};

export default GroupBreadcrumb;
