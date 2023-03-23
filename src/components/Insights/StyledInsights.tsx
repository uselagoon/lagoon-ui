import styled from "styled-components";
import { bp, color } from 'lib/variables';

export const StyledInsights = styled.div`
  .header {
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
      margin: 10px;
    }
    @media ${bp.wideUp} {
      align-items: center;
      display: flex;
      margin: 15px 20px 10px;
    }
    display: flex;
    justify-content: space-around;
    label {
      display: none;
      padding-left: 20px;
      @media ${bp.wideUp} {
        display: block;
      }
    }
  }
  .text-large {
    font-size: 1.4em;
  }
  .overview {
    ul.overview-list {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      margin: 0 0 20px;
      background: #f3f3f3;
      li.result {
        display: flex;
        flex-direction: column;
        margin: 0;
      }
    }
  }
  .filters-wrapper {
    margin-bottom: 20px;
  }
  .select-filters {
    display: flex;
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
  .data-row {
    display: flex;
    justify-content: space-between;
    border: 1px solid ${color.white};
    border-bottom: 1px solid ${color.lightestGrey};
    border-radius: 0;
    line-height: 1.5rem;
    @media ${bp.smallOnly} {
      padding: 10px;
    }
    @media ${bp.wideUp} {
      padding: 15px 0;
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
    .col {
      @media ${bp.wideUp} {
        padding: 0 20px;
      }
      width: 33.33%;
    }
    .col-2,
    .col-3 {
      text-align: center;
    }
    .description {
      font-style: italic;
      font-size: 12px;
    }
    a.external-link {
      color: ${color.brightBlue};
      text-decoration: underline;
      font-style: italic;
    }
  }
  .data-none {
    border: 1px solid ${color.white};
    border-bottom: 1px solid ${color.lightestGrey};
    border-radius: 3px;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    text-align: center;
  }
  .row-heading {
    background: ${color.white};
  }
`;
