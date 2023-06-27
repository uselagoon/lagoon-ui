import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledDefaultContent = styled.div`
  .field-wrapper {
    flex-direction: column;
  }
  .rawdata {
    max-width: 100%;
    .rawdata-elements {
      border: 1px solid ${color.lightestGrey};
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      background-color: ${props => props.theme.backgrounds.table};
      width: 100%;
      @media ${bp.wideUp} {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
      & > div {
        padding-left: 20px;
        @media ${bp.wideDown} {
          padding-right: 40px;
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
    pre {
      font-family: monospace, monospace;
      font-size: 1em;
      width: 100%;
      white-space: pre-wrap;
      overflow-y: scroll;
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
  }
`;

export const StyledDrutinyContent = styled.div`
  .field-wrapper {
    flex-direction: column;
  }
  .failure-result {
    white-space: pre-wrap;
  }
  .data-wrapper {
    margin-bottom: 30px;
  }
  .table {
    display: flex;
    flex-direction: column;
  }
  .data {
    background: #2d2d2d;
    padding: 20px;
    color: white;
    font: 0.8rem Inconsolata, monospace;
    line-height: 2;
    transition: all 0.6s ease-in-out;
    padding: 20px;
    width: 100%;
    .key {
      color: ${color.brightBlue};
    }
  }
`;
