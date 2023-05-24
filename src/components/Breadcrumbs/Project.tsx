import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Project';
import useTranslation from 'lib/useTranslation';

const ProjectBreadcrumb = ({ projectSlug }: { projectSlug: string }) => {
  const t = useTranslation();
  const linkData = getLinkData(projectSlug);

  return <Breadcrumb header={t('breadcrumbs.project')} title={projectSlug} {...linkData} />;
};

export default ProjectBreadcrumb;
