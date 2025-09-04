import { color } from 'lib/variables';
import styled from 'styled-components';

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
  button.icon {
    padding: 0 10px;
    display: flex !important;
  }
`;

export const NewVariableModal = styled.div`
  .var-modal {
    padding: 10px 0;
  }
  .variable-target {
    text-align: center;
    color: #5f6f7a;
    font-family: 'source-code-pro', sans-serif;
    font-weight: bold;
  }
  input,
  textarea {
    margin-right: 10px;
    width: 100%;
  }
  .form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: ${color.blue};
      cursor: pointer;
    }
  }
  .add-var-btn {
    margin-top: 16px;
  }
  a.hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
  .react-select__control,
  .react-select__menu,
  .react-select__option,
  .react-select__single-value {
    background: ${props => props.theme.backgrounds.primary};
    color: ${props => props.theme.texts.primary};
  }
`;
