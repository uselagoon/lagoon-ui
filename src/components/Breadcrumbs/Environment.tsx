import React, { FC } from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Environment';
import useTranslation from 'lib/useTranslation';

interface EnvironmentBreadcrumbProps {
  environmentSlug: string;
  projectSlug: string;
}

const EnvironmentBreadcrumb: FC<EnvironmentBreadcrumbProps> = ({ environmentSlug, projectSlug }) => {
  const t = useTranslation();
  const linkData = getLinkData(environmentSlug, projectSlug);

  return <Breadcrumb header={t('breadcrumbs.environment')} title={environmentSlug} {...linkData} />;
};

export default EnvironmentBreadcrumb;
