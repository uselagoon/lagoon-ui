import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useTranslation from 'lib/useTranslation';

import { ButtonRow, DeploymentDetails, FieldWrapper, SkeletonWrapper } from './StyledDeployment';

const DeploymentSkeleton = () => {
  const t = useTranslation();

  return (
    <div className="deployment">
      <DeploymentDetails>
        <FieldWrapper className="created">
          <div>
            <label>{t('deployment.label.created')}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </FieldWrapper>
        <FieldWrapper className="status">
          <div>
            <label>{t('deployment.label.status')}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </FieldWrapper>
        <FieldWrapper className="duration">
          <div>
            <label>{t('deployment.label.duration')}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </FieldWrapper>
        <FieldWrapper className="logstatus">
          <div>
            <label>{t('deployment.label.logView')}</label>
            <div className="field">
              <Skeleton />
            </div>
          </div>
        </FieldWrapper>
      </DeploymentDetails>
      <ButtonRow>
        <Skeleton />
      </ButtonRow>
      <SkeletonWrapper>
        <Skeleton count={10} style={{ height: '60px', lineHeight: '0.1' }} />
      </SkeletonWrapper>
    </div>
  );
};

export default DeploymentSkeleton;
