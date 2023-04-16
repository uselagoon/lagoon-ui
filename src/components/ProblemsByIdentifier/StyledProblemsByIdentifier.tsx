import styled from "styled-components";
import { bp, color } from "lib/variables";

export const IdentifierHeader = styled.div`
    @media ${bp.wideUp} {
      display: flex;
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 20px;
    }

    display: flex;
    justify-content: space-between;

    label {
      display: none;
      padding-left: 20px;
      @media ${bp.wideUp} {
        display: block;
      }
    }
    .identifier {
      width: 45%;
    }
    .source {
      width: 20%;
    }
    .severity {
      width: 18%;
    }
    .projectsAffected {
      width: 17.5%;
    }
`;

export const StyledProblemsByIdentifier = styled.div`
  input#filter {
    width: 100%;
    border: none;
    padding: 10px 20px;
    margin: 0;
  }
  .button-sort {
    color: #5f6f7a;
    font-family: "source-code-pro", sans-serif;
    font-size: 13px;
    font-size: 0.8125rem;
    line-height: 1.4;
    text-transform: uppercase;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;

    &.identifier {
      padding-left: 20px;
    }

    &.ascending:after {
      content: " \\25B2";
    }

    &.descending:after {
      content: " \\25BC";
    }
  }

  .expanded-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px;
    background: ${color.lightestGrey};

    .fieldWrapper {
      padding: 0 2em 1em 0;
    }

    .left-content,
    .right-content {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
    }

    .problems-link {
      color: #2bc0d8;
    }
  }

  .more {
    background: none;
    border: none;
    color: #2bc0d8;
    padding: 5px 0;
    text-transform: uppercase;
    font-size: 0.8em;
    cursor: pointer;
  }

  .data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

    .data-none {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-bottom: 1px solid ${props => props.theme.borders.tableRow};
      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
    }

    .data-row {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-bottom: 1px solid ${props => props.theme.borders.tableRow};
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      @media ${bp.wideUp} {
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
      }

      & > div {
        padding-left: 20px;
        @media ${bp.wideDown} {
          padding-right: 40px;
        }
        @media ${bp.wideUp} {
        }
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

    .row-heading {
      cursor: pointer;
    }

    .row-data {
      padding: 0;
      margin: 0;
      background: #2d2d2d;
      color: white;
      font: 0.8rem Inconsolata, monospace;
      line-height: 2;
      transition: all 0.6s ease-in-out;
    }

    .data {
      padding: 20px;
      width: 100%;
    }
  }
`;
