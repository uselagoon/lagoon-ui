import styled from "styled-components";
import { bp, color } from "lib/variables";

export const StyledViewDeployTargets = styled.div`
  label {
    color: ${color.blue};
  }
`;

export const StyledViewDeployTargetsModal = styled.div`
  text-align: center;
  .deployTargetsWrapper {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    overflow: hidden;
  }
  .deployTargets {
    width: 15vw;
  }
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
    }
    a.external-link {
      color: ${color.brightBlue};
      text-decoration: underline;
      font-style: italic;
    }
  }
  .button-sort {
    color: ${color.blue};
    position: relative;
    font-family: "source-code-pro", sans-serif;
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
      content: " \\25B2";
    }
    &.descending:after {
      content: " \\25BC";
    }
    &:first-child {
      padding-left: 0;
    }
  }
  .row-heading {
    background: ${color.white};
  }
  .form-input a {
    color: ${color.blue};
  }
`;
