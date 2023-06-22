import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const commonBg = color => `
background-color: ${color};
flex: 1 0 auto;
width: 100%;
`;

export const CommonWrapper = styled.div`
  ${props => commonBg(props.theme.backgrounds.primary)}
  h2 {
    margin: 38px calc((100vw / 16) * 1) 0;
    @media ${bp.wideUp} {
      margin: 62px calc((100vw / 16) * 2) 0;
    }
    @media ${bp.extraWideUp} {
      margin: 62px calc((100vw / 16) * 3) 0;
    }
  }
  & > .content {
    min-height: 80vh;
    margin: 38px calc((100vw / 16) * 1);
    @media ${bp.wideUp} {
      margin: 38px calc((100vw / 16) * 2);
    }
    @media ${bp.extraWideUp} {
      margin: 38px calc((100vw / 16) * 3);
    }
  }
`;

export const CommonWrapperMargin = styled.div`
  ${props => commonBg(props.theme.backgrounds.primary)}
  h2 {
    margin: 38px calc((100vw / 16) * 1) 0;
    @media ${bp.wideUp} {
      margin: 62px calc((100vw / 16) * 1) 0;
    }
    @media ${bp.extraWideUp} {
      margin: 62px calc((100vw / 16) * 2) 0;
    }
  }
  & > .content {
    min-height: 80vh;
    margin: 38px calc((100vw / 16) * 1);
    @media ${bp.wideUp} {
      margin: 38px calc((100vw / 16) * 1);
    }
    @media ${bp.extraWideUp} {
      margin: 38px calc((100vw / 16) * 2);
    }
  }
`;

export const CommonWrapperWNotification = styled.div`
  ${props => commonBg(props.theme.backgrounds.content)}
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  & > .content {
    min-height: 80vh;
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;

    .notification {
      background-color: ${color.lightBlue};
      color: ${color.white};

      padding: 10px 20px;
    }
  }
`;

export const CommonFiltersWrapper = styled.div`
  ${props => commonBg(props.theme.backgrounds.primary)}
  margin: 38px calc((100vw / 16) * 1);
  @media ${bp.wideUp} {
    margin: 38px calc((100vw / 16) * 2);
  }
  @media ${bp.extraWideUp} {
    margin: 38px calc((100vw / 16) * 3);
  }
  .filters {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1em;
    flex-direction: column;

    @media ${bp.wideUp} {
      flex-flow: row;
    }
  }
`;
