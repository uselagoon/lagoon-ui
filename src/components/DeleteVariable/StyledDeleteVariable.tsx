import { color } from 'lib/variables';
import styled from 'styled-components';

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
  button.btn-red:not(.icon) {
    padding: 8px 26px;
  }
  button.icon {
    padding: 0 10px;
    display: flex !important;
  }
`;
