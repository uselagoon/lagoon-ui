import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useTranslation from 'lib/useTranslation';

import { BulkDeploymentsDataTable, BulkDeploymentsHeader } from './StyledBulkDeployments';

const BulkDeploymentsSkeleton = () => {
  const t = useTranslation();
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;
  const rowItem = (
    <div className="data-row">
      <div className="project">
        <Skeleton />
      </div>
      <div className="environment">
        <Skeleton />
      </div>
      <div className="name">
        <Skeleton />
      </div>
      <div className="priority">
        <Skeleton />
      </div>
      <div className="started">
        <Skeleton />
      </div>
      <div className="status">
        <Skeleton />
      </div>
      <div className="duration"></div>
      <div></div>
    </div>
  );

  return (
    <div className="deployments">
      <BulkDeploymentsHeader>
        <label>{t('bulkDeployments.label.project')}</label>
        <label>{t('bulkDeployments.label.environment')}</label>
        <label>{t('bulkDeployments.label.name')}</label>
        <label className="priority">{t('bulkDeployments.label.priority')}</label>
        <label>{t('bulkDeployments.label.created')}</label>
        <label>{t('bulkDeployments.label.status')}</label>
        <label>{t('bulkDeployments.label.duration')}</label>
        <label></label>
      </BulkDeploymentsHeader>
      <BulkDeploymentsDataTable>{[...Array<undefined>(numberOfItems)].map(() => rowItem)}</BulkDeploymentsDataTable>
    </div>
  );
};

export default BulkDeploymentsSkeleton;
