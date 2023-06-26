import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledGroupMembers = styled.section`
  .OWNER-label {
    color: ${color.white};
    background-color: ${color.lightRed};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .MAINTAINER-label {
    color: ${color.white};
    background-color: ${color.lightBlue};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .DEVELOPER-label {
    color: ${color.white};
    background-color: ${color.teal};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .REPORTER-label {
    color: ${color.darkGrey};
    background-color: ${color.midGrey};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .GUEST-label {
    color: ${color.black};
    background-color: ${color.lightGreen};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .system-user-label {
    color: ${color.white};
    background-color: ${color.black};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 20%;
    max-width: 100px;
    > * {
      all: unset;
      background: ${color.lightRed};
      cursor: pointer;
      border-radius: 0.2rem;
      width: 100%;
      padding: 0.5rem 1rem;
    }
  }
  .name {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    width: 55%;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .role {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    width: 30%;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    .data-none {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
    }
    .data-row {
      background-position: right 20px center;
      background-repeat: no-repeat;
      background-size: 18px 11px;
      border: 1px solid ${props => props.theme.borders.tableRow};
      transition: all 0.3s ease;
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media ${bp.tinyUp} {
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
      }
      & > div {
        padding-left: 20px;
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
  }
  .header {
    @media ${bp.tinyUp} {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 0 0 14px;
      padding-right: 40px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }
    .searchInput {
      background: url('/static/images/search.png') 12px center no-repeat ${props => props.theme.backgrounds.input};
      background-size: 14px;
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 4px;
      height: 40px;
      padding: 0 12px 0 34px;
      transition: border 0.5s ease;
      @media ${bp.smallOnly} {
        margin-bottom: 20px;
        order: -1;
        width: 100%;
      }
      @media ${bp.tabletUp} {
        width: 30%;
      }
      &::placeholder {
        color: ${color.grey};
      }
      &:focus {
        border: 1px solid ${color.brightBlue};
        outline: none;
      }
    }

    label {
      display: none;
      padding-left: 20px;
      width: 50%;
      @media ${bp.tinyUp} {
        display: block;
      }
    }
  }
`;
