import styled from "styled-components";
import { color } from "lib/variables";

export const NewVariable = styled.div`
  .var-modal {
    padding: 10px 0;
  }
  input {
    margin-right: 10px;
    width: 100%;
  }
  .form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .add-var-btn {
    margin-top: 16px;
  }
`;

export const NewVariableModal = styled.div`
  .var-modal {
    padding: 10px 0;
  }
  .variable-target{
    padding: 4px 8px;
  }
  input {
    margin-right: 10px;
    width: 100%;
  }
  .form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .add-var-btn {
    margin-top: 16px;
  }
  a.hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
`;
