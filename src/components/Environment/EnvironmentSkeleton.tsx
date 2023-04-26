import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useTranslation from 'lib/useTranslation';

import { StyledEnvironmentDetails } from './StyledEnvironment';

const EnvironmentSkeleton = () => {
  const t = useTranslation();
  return (
    <StyledEnvironmentDetails className="details">
      <div className="field-wrapper environmentType">
        <div>
          <label>{t('environment.envType')}</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="field-wrapper deployType">
        <div>
          <label>{t('environment.deployType')}</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="field-wrapper created">
        <div>
          <label>{t('environment.created')}</label>
          <div className="field">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
      <div className="field-wrapper updated">
        <div>
          <label>{t('environment.lastDeploy')}</label>
          <div className="field">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
      <div className="field-wrapper source">
        <div>
          <label>{t('environment.source')}</label>
          <div className="field">
            <Skeleton width={'50%'} />
          </div>
        </div>
      </div>
      <div className="field-wrapper routes">
        <div>
          <label>{t('environment.routes')}</label>
          <div className="field">
            <Skeleton width={'50%'} />
          </div>
        </div>
      </div>
    </StyledEnvironmentDetails>
  );
};

export default EnvironmentSkeleton;
