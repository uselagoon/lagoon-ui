import { FC } from 'react';

import styled from 'styled-components';

import { keyFactImageType } from '../../constants/keyFactImageMap';
import FactCard from './FactCard';

export type KeyFact = { name: keyFactImageType; category: string; value: string; id: number };

interface Props {
  keyFacts: KeyFact[];
}

const KeyFacts: FC<Props> = ({ keyFacts }) => {
  return (
    <StyledKeyFacts>
      <h5>System Details</h5>
      <section>
        {keyFacts.map(fact => {
          return <FactCard key={fact.id} {...fact} />;
        })}
      </section>
    </StyledKeyFacts>
  );
};

const StyledKeyFacts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-block-start: -0.5rem;
  margin-block-end: 2rem;
  padding-inline: 4rem;

  section {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 8.125rem);
    grid-template-rows: auto;
    gap: 0.8rem;
  }
`;

export default KeyFacts;
