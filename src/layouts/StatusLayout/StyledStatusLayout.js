import { bp } from 'lib/variables';
import styled from 'styled-components';

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
      font-size: 1.875vw;
      line-height: 2.1875vw;
      margin: 0.25vw;
      margin-bottom: 1vw;
    }
    p {
      margin-top: 0.25vw;
      font-size: 0.833333333vw;
    }
  }

  .content {
    margin-top: 38px;
    @media ${bp.wideUp} {
      margin: 62px;
    }
    @media ${bp.extraWideUp} {
      margin: 62px;
    }
  }
`;
