import { Colors, Head2 } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const HeaderWithCopy = styled(Head2)`
  display: flex;
  gap: 0.5rem;
  span[aria-label='copy'] {
    color: ${Colors.lagoonBlue} !important;
  }
`;
