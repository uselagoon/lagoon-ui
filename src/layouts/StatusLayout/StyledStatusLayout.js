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
