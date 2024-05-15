import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Organizations/ProjectGroup';

interface Props {
  projectSlug: string;
  organizationSlug: string;
  organizationId: number;
}

const OrgProjectBreadcrumb = ({ projectSlug, organizationSlug, organizationId }: Props) => {
  const linkData = getLinkData(projectSlug, organizationSlug, organizationId, '');

  return <Breadcrumb header="Project" title={projectSlug} {...linkData} />;
};

export default OrgProjectBreadcrumb;
