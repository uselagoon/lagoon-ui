import styled from "styled-components";
import { bp } from "lib/variables";

export const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;

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
