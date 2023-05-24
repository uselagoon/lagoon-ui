import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useTranslation from 'lib/useTranslation';

import ThemedSkeletonWrapper from '../../styles/ThemedSkeletonWrapper';
import { Header, StyledFacts } from './StyledFacts';

const FactsSkeleton = () => {
  const t = useTranslation();
  const factsCount = 10;

  return (
    <StyledFacts>
      <ThemedSkeletonWrapper>
        <div className="filters">
          <input type="text" id="filter" placeholder={t('placeholders.facts') as unknown as string} value={undefined} />
        </div>
        <Header>
          <button type="button" className="button-sort name">
            {t('facts.name')}
          </button>
          <button type="button" className="button-sort value">
            {t('facts.source')}
          </button>
          <button type="button" className="button-sort value">
            {t('facts.value')}
          </button>
        </Header>
        <div className="data-table">
          {[...Array<undefined>(factsCount)].map((_, idx) => (
            <div className="data-row row-heading" key={idx}>
              <div className="col col-1">
                <div className="name">
                  <Skeleton />
                </div>
                <div className="description">
                  <Skeleton />
                </div>
              </div>
              <div className="col col-2">
                <Skeleton />
              </div>
              <div className="col col-3">
                <Skeleton />
              </div>
            </div>
          ))}
        </div>
      </ThemedSkeletonWrapper>
    </StyledFacts>
  );
};

export default FactsSkeleton;
