import { FC } from 'react';

import Image from 'next/image';

import getKeyFactImage from '@/constants/keyFactImageMap';
import styled from 'styled-components';

import { KeyFact } from './KeyFacts';

const FactCard: FC<KeyFact> = ({ name, category, value }) => {
  const image = getKeyFactImage(name);

  return (
    <StyledCard>
      <span className="category">{category}</span>
      <Image className="img" width={49} height={49} src={image} alt="keyfact image" />
      <span className="name">{name}</span>
      <span className="value">{value}</span>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  width: 8.125rem;
  min-height: 6.25rem;
  padding: 5px;

  img {
    margin-inline: auto;
    margin-bottom: 8px;
    margin-top: auto;
  }
  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.24px;
    text-transform: uppercase;
    &.category {
      margin-bottom: 3px;
    }
    &.name,
    &.value {
      line-height: 11px;
      text-align: right;
      text-transform: initial;
      margin-bottom: 2px;
    }
  }
`;

export default FactCard;
