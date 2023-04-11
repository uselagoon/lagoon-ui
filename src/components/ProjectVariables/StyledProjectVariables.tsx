import styled from "styled-components";
import { bp, color } from "lib/variables";

export const StyledProjectVariablesDetails = styled.div`
  padding: 32px calc((100vw / 16) * 1);
  width: 100%;
  @media ${bp.xs_smallUp} {
    min-width: 100%;
    padding-left: calc(((100vw / 16) * 1.5) + 28px);
    padding-top: 48px;
    width: 100%;
  }
  @media ${bp.tabletUp} {
    padding: 48px calc((100vw / 16) * 1) 48px
      calc(((100vw / 16) * 1.5) + 28px);
  }
  @media ${bp.extraWideUp} {
    padding-left: calc(((100vw / 16) * 1));
  }
  .showHide {
    margin-left: 16px !important;
    width: 30px !important;
  }
  .showHideContainer span {
    vertical-align: middle;
  }
  .unauthorized-add-var {
    margin-top: 8px;
    padding: 4px;
  }
  span {
    overflow: visible !important;
  }
  .field-wrapper {
    &::before {
      left: calc(((-100vw / 16) * 1.5) - 28px);
      display: block;
      position: absolute;
    }
    @media ${bp.xs_smallUp} {
      min-width: 50%;
      position: relative;
      width: 50%;
    }
    @media ${bp.wideUp} {
      min-width: 33.33%;
      width: 33.33%;
    }
    @media ${bp.extraWideUp} {
      min-width: 25%;
      width: 25%;
    }

    &.env-vars {
      width: 100%;
      display: block;
      margin-top: 16px;
    }

    &.source {
      width: 100%;

      &::before {
        background-image: url("/static/images/git-lab.svg");
        background-size: 19px 17px;
      }

      .field {
        color: ${color.linkBlue};
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    & > div {
      width: 100%;
    }
  }
  tr,
  th {
    text-align: center;
    vertical-align: middle;
  }
  tr {
    height: 57px;
    max-height: 57px;
  }
  .varName {
    min-width: 20%;
    width: 30%;
    word-break: break-word;
  }
  .varScope {
    min-width: 10%
    max-width: 15%;
    width: 10%;
  }
  .varValue {
    min-width: 30%
    max-width: 35%;
    width: 35%;
  }
  .varValue span {
    cursor: pointer;
  }
  .varDelete {
    max-width: 10%;
    width: 10%;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    align-items: center;
  }
  .header-buttons {
    display: flex;
    margin: 0 4px;

    button {
      margin-right: 4px;
    }
  }
  .loader {
    display: inline-block;
    width: 36px;
    height: 36px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 24px;
    height: 24px;
    margin: 8px;
    border-radius: 50%;
    border: 2px solid ${color.blue};
    border-color: ${color.blue} transparent ${color.blue} transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
