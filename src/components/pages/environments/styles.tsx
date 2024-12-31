import Link from 'next/link';

import { IconGrid, IconList } from '@uselagoon/ui-library';
import styled, { css } from 'styled-components';

export const StyledEnvironmentsWrapper = styled.section`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const LinkContainer = styled(Link)`
  display: flex;
  gap: 0.2rem;
  align-items: center;
`;

const sharedIconStyles = css`
  font-size: 25px;
  opacity: 0.4;
  svg {
    fill: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#000')};
  }
  &.active {
    opacity: 1;
  }
`;

export const StyledGridIcon = styled(IconGrid)`
  ${sharedIconStyles}
`;
export const StyledListIcon = styled(IconList)`
  ${sharedIconStyles}
`;

export const StyledToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'AmericaMono-Regular', sans-serif;
  font-size: 10px;
  letter-spacing: -1px;
  cursor: pointer;
`;

export const StyledEnvCount = styled.div`
  font-family: 'ArabicPro-Regular', sans-serif;
  margin-top: 1rem;
`;
