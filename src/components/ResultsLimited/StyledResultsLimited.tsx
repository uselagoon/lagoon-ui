import styled from "styled-components";
import { color } from "lib/variables";

export const StyledResultsLimited = styled.div`
  .results {
    padding: 8px;
    display: flex;
    justify-content: right;
  }
  .description {
    background: ${color.white};
    border: 1px solid ${color.lightestGrey};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    justify-content: space-between;
    margin-top: 8px;
    padding: 8px;
    display: flex;
    justify-content: center;
    color: ${color.darkGrey};
  }
`;
