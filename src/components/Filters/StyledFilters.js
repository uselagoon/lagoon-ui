import styled from "styled-components";
import { bp } from "lib/variables";

export const FiltersTitle = styled.label`
  margin: auto 0;
  @media ${bp.wideUp} {
    margin: auto 15px;
  }
`;

export const Filter = styled.div`
  margin-bottom: 1em;

  @media ${bp.wideUp} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 2 1 auto;
    margin: 0;
  }
`;
