import styled from "styled-components";
import { color } from "lib/variables";

export const StyledActiveStandbyConfirm = styled.div`
  .margins {
    margin-right: 10px;
  }
  input {
    margin-right: 10px;
    width: 100%;
  }
  .environment-name {
    font-weight: bold;
    color: ${color.lightBlue};
  }
  a.hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
  .form-input {
    display: flex;
    align-items: center;
  }
`;
