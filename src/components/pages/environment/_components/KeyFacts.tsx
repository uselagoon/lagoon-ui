import { FC } from 'react';

import { keyFactImageType } from '@/constants/keyFactImageMap';
import { LoadingSkeleton } from '@uselagoon/ui-library';
import styled from 'styled-components';

import FactCard from './FactCard';

export type KeyFact = { name: keyFactImageType; category: string; value: string; id: number};

type FactsProps = {
  keyFacts: KeyFact[];
  loading?: false;
};

type Loading = {
  loading: true;
  keyFacts?: undefined;
};

type Props = Loading | FactsProps;

const KeyFacts: FC<Props> = ({ keyFacts, loading }) => {
  return (
    <StyledKeyFacts>
      <section>
        {loading ? (
          <>
            <LoadingSkeleton width={130} height={100} />
            <LoadingSkeleton width={130} height={100} />
            <LoadingSkeleton width={130} height={100} />
          </>
        ) : (
          keyFacts.map(fact => {
            return <FactCard key={fact.id} {...fact} />;
          })
        )}
      </section>
    </StyledKeyFacts>
  );
};

const StyledKeyFacts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-block: 2rem;

  section {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 8.125rem);
    grid-template-rows: auto;
    gap: 0.8rem;
  }
`;

export default KeyFacts;
