import { bp } from 'lib/variables';
import styled from 'styled-components';

export const DeploymentDetails = styled.div`
  padding-inline: 5% 10%;
  width: 100%;
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
`;

export const ButtonRow = styled.div`
  padding: 0px calc(100vw / 16) 20px;
  margin-block: 0.5rem;
  width: 100%;
  @media ${bp.xs_smallUp} {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;
    padding-left: calc(((100vw / 16) * 1.5) + 28px);
    position: relative;
    width: 100%;
  }
  @media ${bp.tabletUp} {
    padding: 0 calc(100vw / 16) 20px calc(((100vw / 16) * 1.5) + 28px);
  }
  @media ${bp.extraWideUp} {
    padding-left: calc(100vw / 16);
  }
`;

export const SkeletonWrapper = styled.div`
  padding: 0 calc(100vw / 16) 48px;
`;
