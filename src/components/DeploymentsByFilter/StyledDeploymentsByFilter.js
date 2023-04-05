import styled, { css } from "styled-components";
import { bp, color } from "lib/variables";

export const Deployments = styled.div`
  ${css`
    .box {
      margin-bottom: 7px;

      .content {
        padding: 9px 20px 14px;
        @media ${bp.tinyUp} {
          display: flex;
        }
      }
    }
    input#filter {
      width: 100%;
      border: none;
      padding: 10px 20px;
      margin: 0;
      font-style: italic;
    }

    .button-sort {
      color: #5f6f7a;
      position: relative;
      font-family: "source-code-pro", sans-serif;
      font-size: 13px;
      font-size: 0.8125rem;
      line-height: 1.4;
      text-transform: uppercase;
      padding-left: 20px;
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

    .expanded-wrapper {
      padding: 20px;
      background: ${color.lightestGrey};
      .fieldWrapper {
        padding-bottom: 20px;
      }
    }
  `}
`;

export const DeploymentsHeader = styled.div`
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

  label,
  button {
    display: none;
    padding-left: 20px;
    width: 50%;
    @media ${bp.tinyUp} {
      display: block;
      text-align: left;
    }
  }
`;

export const DeploymentsDataTable = styled.div`
  background-color: ${props => props.theme.backgrounds.table};

  border: 1px solid ${props => props.theme.borders.box};
  border-radius: 3px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

  .data-none {
    border: 1px solid ${color.white};
    border: 1px solid ${props => props.theme.borders.box};
    border-radius: 3px;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    text-align: center;
  }

  .data-row {
    border: 1px solid ${props => props.theme.borders.box};
    border-bottom: 1px solid ${props => props.theme.borders.box};
    border-radius: 0;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    transition: all 0.3s ease;

    @media ${bp.tinyUp} {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      padding-left: 20px;
      @media ${bp.tinyUp} {
        width: 20%;
      }
      @media ${bp.xs_smallUp} {
        width: 24%;
      }
    }

    & > div.project, div.environment{
      white-space: pre-line;
      word-break: break-all;
    }
    &.skeleton{
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

    .status {
      @media ${bp.smallOnly} {
        background: none;
        background-size: 0;
      }
      padding-left: 0;
      margin-left: 15px;
      background-position: 5px 7px;
      background-repeat: no-repeat;
      background-size: 10px 10px;
      text-indent: 20px;

      &.active {
        background-image: url("/static/images/in-progress.svg");
      }

      &.new {
        background-image: url("/static/images/in-progress.svg");
      }

      &.pending {
        background-image: url("/static/images/in-progress.svg");
      }

      &.running {
        background-image: url("/static/images/in-progress.svg");
      }

      &.failed {
        background-image: url("/static/images/failed.svg");
      }

      &.cancelled {
        background-image: url("/static/images/failed.svg");
      }

      &.succeeded {
        background-image: url("/static/images/successful.svg");
      }

      &.complete {
        background-image: url("/static/images/successful.svg");
      }

      span {
        @media ${bp.tiny_wide} {
          display: none;
        }
      }
    }
  }
`;
