import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Organizations/Groups';

interface Props {
  organizationSlug: string;
  organizationId: number;
}

const GroupsBreadcrumb = ({ organizationSlug, organizationId }: Props) => {
  const linkData = getLinkData(organizationSlug, organizationId, '');

  return <Breadcrumb header="Groups" title="Groups" {...linkData} />;
};

export default GroupsBreadcrumb;
