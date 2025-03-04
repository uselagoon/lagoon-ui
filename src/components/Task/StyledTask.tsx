import { bp } from 'lib/variables';
import styled from 'styled-components';

export const StyledTask = styled.div`
  .details {
    padding-inline: 5% 10%;
    width: 100%;
    row-gap: 1rem;
    @media ${bp.xs_smallUp} {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      position: relative;
      width: 100%;
    }

    @media ${bp.extraWideUp} {
      padding-top: 48px;
    }

    h3 {
      width: 100%;
      @media ${bp.xs_smallUp} {
        left: calc(100vw / 16);
        position: absolute;
        top: 32px;
      }
      @media ${bp.tabletUp} {
        top: 48px;
      }
      @media ${bp.extraWideUp} {
        min-width: 25%;
        padding-right: 60px;
        position: initial;
        width: 25%;
      }
    }
  }
`;

export const CancelRow = styled.div`
  padding-left: 4%;
  margin-block: 0.5rem;
  .cancel-button {
    max-height: 100px;
    max-width: 120px;
  }
`;
