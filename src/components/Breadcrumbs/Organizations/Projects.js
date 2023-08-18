import React from 'react';
import { getLinkData } from 'components/link/Organizations/Projects';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';

const ProjectsBreadcrumb = ({ organizationSlug, organizationName }) => {
  const linkData = getLinkData(organizationSlug, organizationName);

  return (
    <Breadcrumb
      header="Projects"
      title="Projects"
      {... linkData}
    />
  );
};

export default ProjectsBreadcrumb;
