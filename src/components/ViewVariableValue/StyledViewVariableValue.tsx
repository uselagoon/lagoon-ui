import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledViewVariableValue = styled.div`
  label {
    color: ${color.blue};
  }
`;

export const StyledViewVariableValueModal = styled.div`
  .data-row {
    border-radius: 0;
    line-height: 1.5rem;
    @media ${bp.smallOnly} {
      padding: 10px;
    }
    @media ${bp.wideUp} {
      padding: 15px 0;
    }
    &:first-child {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    &:last-child {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    .col {
      @media ${bp.wideUp} {
        padding: 0 20px;
      }
      width: 33.33%;
    }
    .col-3 {
      width: fit-content;
      line-break: anywhere;
      white-space: break-spaces;
    }
    a.external-link {
      color: ${color.brightBlue};
      text-decoration: underline;
      font-style: italic;
    }
  }
  .form-input {
    display: flex;
    align-items: center;

    span {
      color: ${color.blue};
      cursor: pointer;
    }
  }
  .button-sort {
    color: ${color.blue};
    position: relative;
    font-family: 'source-code-pro', sans-serif;
    font-size: 13px;
    font-size: 0.8125rem;
    line-height: 1.4;
    text-transform: uppercase;
    border: none;
    background: none;
    cursor: pointer;
    &:after {
      position: absolute;
      right: -18px;
      top: 0;
      width: 20px;
      height: 20px;
    }
    &.ascending:after {
      content: ' \\25B2';
    }
    &.descending:after {
      content: ' \\25BC';
    }
    &:first-child {
      padding-left: 0;
    }
  }
  .row-heading {
    background-color: ${props => props.theme.backgrounds.table};
  }
`;
