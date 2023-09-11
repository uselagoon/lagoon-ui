import styled from "styled-components";
import { color } from "lib/variables";

export const DeleteVariableModal = styled.div`
  input {
    margin-right: 10px;
    width: 100%;
  }
  .hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
  .delete-name {
    font-weight: bold;
    color: ${color.lightBlue};
  }
  .form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .deleteConfirmImg span {
    cursor: pointer;
  }
`;

export const DeleteVariableButton = styled.div`
  button.icon {
    padding: 0 10px;
  }
`;