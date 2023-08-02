import { bp, color } from 'lib/variables';
import styled, { css } from 'styled-components';

export const commonBg = (color: string) => `
background-color: ${color};
flex: 1 0 auto;
width: 100%;
`;

export const OrganizationsWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }
  ${props => commonBg(props.theme.backgrounds.content)}

  & > .content {
    width: 100%;
    min-height: 80vh;
  }
  .projects-wrapper {
    flex-grow: 1;
    padding: 40px calc((100vw / 16) * 1);
  }
`;

export const GroupPageWrapper = styled.div`
  padding: 32px;
  width: 100%;

  .details {
    min-width: 50vw !important;
    padding: 1rem;
    .content {
      padding: 2rem;
      width: 100%;
    }

    @media ${bp.xs_smallUp} {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      width: 100%;
    }

    .field-wrapper {
      &::before {
        padding-right: unset;
        width: unset;
        margin-inline: 14px;
      }
      margin: 0px;
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

      &.environmentType {
        &::before {
          background-size: 20px 20px;
        }
      }
    }
  }

  .rightside-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0;
  }
  .content-wrapper {
    @media ${bp.tabletUp} {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const StyledNotificationWrapper = styled.div`
  .margins {
    margin-right: 10px;
    button {
      margin-inline: 14px;
      margin-bottom: 28px;
    }
    @media (min-width: 1399px) {
      button {
        width: max-content;
        min-width: 150px;
        font-size: 0.85em !important;
        padding: 0.5em 0.75em;
      }
    }
  }
  .modal-content {
    max-width: 70%;
  }
`;

export const StyledNotification = styled.div`
  .form-box input,
  textarea {
    display: block;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.texts.primary : '#5f6f7a')};
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  .selectRole {
    font-family: 'source-sans-pro', sans-serif;
    line-height: 1.25rem;
  }
  .environment-name {
    font-weight: bold;
    color: ${color.lightBlue};
  }
  a.hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
  .form-input {
    display: flex;
    align-items: center;
  }
`;

export const sharedTableStyles = css`
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
      // & > div {
      //   padding-left: 20px;
      // }
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
