import styled from "styled-components";
import { bp, color } from "lib/variables";

export const CommonWrapper = styled.div`
  h2 {
    margin: 38px calc((100vw / 16) * 1) 0;
    @media ${bp.wideUp} {
      margin: 62px calc((100vw / 16) * 2) 0;
    }
    @media ${bp.extraWideUp} {
      margin: 62px calc((100vw / 16) * 3) 0;
    }
  }
  .content {
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
  h2 {
    margin: 38px calc((100vw / 16) * 1) 0;
    @media ${bp.wideUp} {
      margin: 62px calc((100vw / 16) * 1) 0;
    }
    @media ${bp.extraWideUp} {
      margin: 62px calc((100vw / 16) * 2) 0;
    }
  }
  .content {
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
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  .content {
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
