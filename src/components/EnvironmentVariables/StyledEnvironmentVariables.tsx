import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const VariableActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledEnvironmentVariableDetails = styled.div`
  padding: 32px calc((100vw / 16) * 1);
  width: 100%;
  @media ${bp.xs_smallUp} {
    min-width: 100%;
    padding-left: calc(((100vw / 16) * 1.5) + 28px);
    padding-top: 48px;
    width: 100%;
  }
  @media ${bp.tabletUp} {
    padding: 48px calc((100vw / 16) * 1) 48px calc(((100vw / 16) * 1.5) + 28px);
  }
  @media ${bp.extraWideUp} {
    padding-left: calc(((100vw / 16) * 1));
  }
  .showHide {
    margin-left: 8px !important;
    width: 30px !important;
  }
  .showHideContainer span {
    vertical-align: middle;
    overflow: visible !important;
  }
  .unauthorized-add-var {
    margin-top: 8px;
    padding: 4px;
  }
  button .deployLink.hover-state {
    color: #fff;
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
        background-image: url('/static/images/git-lab.svg');
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
  .varName {
    word-break: break-word;
  }
  .varValue {
    & span {
      cursor: pointer;
    }

    & .margins {
      margin-left: 10%;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    align-items: center;

    &.no-vars {
      justify-content: flex-end;
    }
  }
  .header-buttons {
    display: flex;
    margin: 0 4px;

    .add-variable {
      width: 54px;
      height: 38px;
    }

    @media ${bp.xs_smallUp} {
      .show-value-btn {
        min-width: 116px;
      }
    }

    button {
      margin-right: 4px;
    }
  }
  .loader {
    display: inline-block;
    width: 36px;
    height: 36px;

    &.value-btn {
      width: 90px;
      height: 17px;
    }
  }
  .loader:after {
    content: ' ';
    display: block;
    width: 24px;
    height: 24px;
    margin: 8px;
    border-radius: 50%;
    border: 2px solid ${color.blue};
    border-color: ${color.blue} transparent ${color.blue} transparent;
    animation: loader 1.2s linear infinite;
  }
  .loader.value-btn:after {
    margin: 0 auto;
    border: 2px solid ${color.white};
    border-color: ${color.white} transparent ${color.white} transparent;
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

export const StyledVariableTable = styled.div`
  .table-header {
    @media ${bp.tinyUp} {
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }

    display: flex;
    justify-content: space-between;

    div.name,
    div.scope,
    div.delete {
      display: none;
      width: 45%;
      @media ${bp.tinyUp} {
        display: block;
        text-align: left;
      }
      &.name {
        width: 65%;
        padding-left: 20px;

        @media ${bp.tabletDown} {
          width: 45%;
        }
      }
      &.scope {
        width: 40%;
      }
      &.delete {
        width: 5%;
      }
    }
  }

  .values-present.table-header {
    width: 80%;
    @media ${bp.tinyUp} {
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }

    div.name,
    div.scope,
    div.value,
    div.delete {
      display: none;
      width: 33%;
      @media ${bp.tinyUp} {
        display: block;
        text-align: left;
      }

      &.name {
        padding-left: 20px;
      }
      &.scope {
        text-align: center;
      }
      &.delete {
        width: 5%;
      }
    }
  }

  .data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }

  .data-none {
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    text-align: center;
  }

  .values-present.data-row {
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 0;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    word-break: break-word;

    @media ${bp.tinyUp} {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      text-align: left;
      @media ${bp.tinyUp} {
        width: 20%;
      }
      @media ${bp.tabletUp} {
        width: 30%;
      }
      @media ${bp.wideUp} {
        width: 30%;
      }
    }

    & .varName {
      padding-left: 20px;
      width: 31%;
      @media ${bp.wideDown} {
        width: 35%;
      }
    }
    & .varScope {
      text-align: center;
    }
    & .varValue {
      width: 32.5%;
    }
    & .varUpdate {
      display: flex;
      padding: 0;

      button {
        background-color: #fff;
      }
    }
    & .varActions {
      width: 20%;
      display: flex;
      align-items: center;

      &:last-child {
        justify-content: flex-end;
        -webkit-box-pack: end;
      }
    }
  }

  .data-row {
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 0;
    line-height: 1.5rem;
    align-items: center;
    padding: 8px 0 7px 0;

    @media ${bp.tinyUp} {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      text-align: left;
      @media ${bp.tinyUp} {
        width: 40%;
      }
      @media ${bp.wideUp} {
        width: 45%;
      }
    }

    & .varName {
      width: 65%;
      padding-left: 20px;

      @media ${bp.tabletDown} {
        width: 45%;
      }
    }
    & .varScope {
      width: 30%;
    }
    & .varActions {
      width: 10%;
      display: flex;

      &:last-child {
        justify-content: flex-end;
        -webkit-box-pack: end;
      }
    }
    & .varDelete {
      padding-right: 10px;
    }

    &.skeleton {
      padding: 20px 0;
    }
    &:hover {
      border: 1px solid ${color.brightBlue};
    }

    &:first-child {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    &:last-child {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }

  .collapsing {
    display: none;
    transition: unset;
  }
`;

export const StyledProjectVariableTable = styled.div`
  .table-header {
    @media ${bp.tinyUp} {
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }

    display: flex;
    justify-content: space-between;

    div.name,
    div.scope {
      display: none;
      width: 45%;
      @media ${bp.tinyUp} {
        display: block;
        text-align: left;
      }
      &.name {
        padding-left: 20px;
      }
      &.delete {
        width: 5%;
      }
    }
  }

  .values-present.table-header {
    @media ${bp.tinyUp} {
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }

    div.name,
    div.scope,
    div.value {
      display: none;
      width: 33%;
      @media ${bp.tinyUp} {
        display: block;
        text-align: left;
      }

      &.name {
        padding-left: 20px;

        @media ${bp.tabletDown} {
          width: 30%;
        }
      }
      &.scope {
        text-align: center;

        @media ${bp.tabletDown} {
          text-align: left;
          width: 20%;
        }
      }
      &.value {
        width: 28%;
        @media ${bp.tabletDown} {
          width: auto;
        }
      }
    }
  }

  .data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }

  .data-none {
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    text-align: center;
  }

  .values-present.data-row {
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 0;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    word-break: break-word;

    @media ${bp.tinyUp} {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      text-align: left;
      @media ${bp.tinyUp} {
        width: 20%;
      }
      @media ${bp.tabletUp} {
        width: 30%;
      }
      @media ${bp.wideUp} {
        width: 30%;
      }
    }

    & .varName {
      padding-left: 20px;
      width: 31%;
      @media ${bp.wideDown} {
        width: 35%;
      }
      @media ${bp.tabletDown} {
        width: 45%;
      }
    }
    & .varScope {
      text-align: center;
      width: 45%;
    }
    & .varValue {
      width: 30%;
    }
  }

  .data-row {
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 0;
    line-height: 1.5rem;
    align-items: center;
    padding: 8px 0 7px 0;

    @media ${bp.tinyUp} {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      text-align: left;
      @media ${bp.tinyUp} {
        width: 40%;
      }
      @media ${bp.wideUp} {
        width: 45%;
      }
    }

    & .varName {
      padding-left: 20px;
    }
    & .varActions {
      width: 10%;
      display: flex;

      &:last-child {
        justify-content: flex-end;
        -webkit-box-pack: end;
      }
    }

    &.skeleton {
      padding: 20px 0;
    }
    &:hover {
      border: 1px solid ${color.brightBlue};
    }

    &:first-child {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    &:last-child {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }

  .collapsing {
    display: none;
    transition: unset;
  }
`;
