import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledProblemsByProject = styled.div`
  .header {
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

    label {
      display: none;
      padding-left: 20px;
      @media ${bp.wideUp} {
        display: block;
      }
    }
  }

  input#filter {
    width: 100%;
    border: none;
    padding: 10px 20px;
    margin: 0;
    ::placeholder {
      color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#000')};
    }
  }

  .button-sort {
    color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : color.darkGrey)};
    font-family: 'source-code-pro', sans-serif;
    font-size: 13px;
    font-size: 0.8125rem;
    line-height: 1.4;
    text-transform: uppercase;
    border: none;
    background: none;
    cursor: pointer;
    min-width: 16.66%;

    &.ascending:after {
      content: ' \\25B2';
    }

    &.descending:after {
      content: ' \\25BC';
    }
  }

  .more {
    background: none;
    border: none;
    color: ${color.brightBlue};
    padding: 5px 0;
    text-transform: uppercase;
    font-size: 0.8em;
    cursor: pointer;
  }

  .data-table {
    background-color: ${color.white};
    border: 1px solid ${color.lightestGrey};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

    .data-none {
      border: 1px solid ${color.white};
      border-bottom: 1px solid ${color.lightestGrey};
      background: ${props => props.theme.backgrounds.primary} !important;
      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
    }

    .data-row {
      border: 1px solid ${color.white};
      border-bottom: 1px solid ${color.lightestGrey};
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
      background: ${props => (props.theme.colorScheme === 'dark' ? `${props.theme.backgrounds.primary}` : '#fff')};
    }
  }

  .data {
    padding: 20px;
    margin: 0;
    color: ${color.white};
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
