import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledProblems = styled.div`
  .header {
    margin: 10px 0px;
    padding: 10px 0px;
    @media ${bp.wideUp} {
      align-items: center;
      display: flex;
      margin: 0 0 14px;
      padding: 0px 12px;
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
  }

  .filters-wrapper {
    .select-filters {
      display: flex;
      flex-direction: column;
      @media ${bp.wideUp} {
        flex-flow: row;
      }

      &:first-child {
        padding-bottom: 1em;
      }
    }
  }

  .text-large {
    font-size: 1.4em;
  }

  .red {
    color: ${color.red};
  }

  .blue {
    color: ${color.blue};
  }

  .yellow {
    color: ${color.lightestBlue};
  }

  .grey {
    color: ${color.grey};
  }

  input#filter {
    width: 100%;
    border: none;
    padding: 10px 20px;
    margin: 0;
  }

  .button-sort {
    color: #5f6f7a;
    font-family: 'source-code-pro', sans-serif;
    font-size: 12px;
    font-size: 0.8125rem;
    line-height: 1.4;
    text-transform: uppercase;
    text-align: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    width: calc(100% / 6);

    &.identifier {
      text-align: left;
    }

    &.ascending:after {
      content: ' \\25B2';
    }

    &.descending:after {
      content: ' \\25BC';
    }
  }

  .overview {
    .overview-list {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      margin: 0 0 20px;
      background-color: ${(props) => props.theme.backgrounds.table};

      li.result {
        display: flex;
        flex-direction: column;
        margin: 0;
      }
    }
  }

  .data-none {
    border: 1px solid ${(props) => props.theme.borders.tableRow};
    border-bottom: 1px solid ${(props) => props.theme.borders.tableRow};
    border-radius: 3px;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    text-align: center;
  }
`;
