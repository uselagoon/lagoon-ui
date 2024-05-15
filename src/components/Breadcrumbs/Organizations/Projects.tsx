import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Organizations/Projects';

interface Props {
  organizationSlug: string;
  organizationId: number;
}

const ProjectsBreadcrumb = ({ organizationSlug, organizationId }: Props) => {
  const linkData = getLinkData(organizationSlug, organizationId, '');

  return <Breadcrumb header="Projects" title="Projects" {...linkData} />;
};

export default ProjectsBreadcrumb;
