import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledAddToGroup = styled.div`
  min-width: 150px !important;
`;

export const NewUser = styled.div`
  input.inputCheckbox {
    margin-left: 5px;
    width: 22px;
    height: 22px;
    transform: translateY(8px);
  }

  .form-box input,
  textarea {
    display: block;
    width: 100% !important;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    color: ${props => props.theme.texts.primary};
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }

  input::placeholder {
    font-size: 1rem;
  }
  .selectRole {
    font-family: 'source-sans-pro', sans-serif;
    line-height: 1.25rem;
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

export const OrganizationSelect = styled.div`
  background: ${props => props.theme.backgrounds.primary};
  border: 1px solid ${props => props.theme.borders.box};
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-flow: column;
  margin-bottom: 32px;
  width: 100%;

  [id^='react-select'] {
    color: black !important;
  }
  @media ${bp.tabletUp} {
    margin-bottom: 0;
  }
`;

export const AddUserButtons = styled.div``;
