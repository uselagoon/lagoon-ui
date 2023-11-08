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
  padding: 15px;
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
    margin-top: 30px;
    margin-bottom: 30px;
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
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    background: #fff;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  input[type='text']::placeholder {
    color: #000;
  }
  .select {
    font-family: 'source-sans-pro', sans-serif;
    line-height: 1.25rem;
    div {
      border-radius: 0 !important;
    }
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
      /* &:hover {
        border: 1px solid ${color.brightBlue};
      } */
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

export const Tag = styled.div<{ background: string }>`
  border-radius: 5px;
  background: ${props => props.background};
  padding: 3px 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  text-transform: uppercase;
  color: #fff;
  width: max-content;
`;

export const TableActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  span > button, span > a {
    height: 100%;
    width: 100%;
  }
  > * {
    height: 36px;
    width: 54px;
    cursor: pointer;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #fff;
      height: 22px;
      width: 22px;
    }

    &.add {
      background: #4578e6;
    }
    &.link {
      border: 1px solid #4578e6 !important;
      background: #fff;
    }
    .view {
      border: 1px solid #4578e6 !important;
      background: #fff;
      display: flex;
      justify-content: center;
      height: 100%;
      width:100%;
      svg {
        color: #4578e6;
      }
    }
    .edit {
      svg {
        color: #4578e6;
      }
    }
    &.delete {
      background: #dc3545;
      svg {
        color: #fff;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 14px;
  gap: 12px;
  height: 40px;
  .btn-primary {
    margin-left: auto;
    background: #4578e6;
    color: #fff;
    transition: all 0.3s ease;
    &:not(.btn--disabled):hover {
      background: #2e69e6;
    }
  }
  .btn--disabled {
    background: gray;
    margin-right: 0;
  }
  .btn-ghost {
    background: #fff;
    border: 1px solid #4578e6;
    color: #4578e6;
    transition: all 0.3s ease;

    &:hover {
      background: #2e69e6;
      color: #fff;
    }
  }
  p.explainer{
    color:#E30000;
    font-size: 11px;
  }
`;

export const ModalChildren = styled.div`
  .form-box input,
  textarea {
    display: block;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    background: #fff;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  input[type='text']::placeholder {
    color: #000;
  }
  .select {
    font-family: 'source-sans-pro', sans-serif;
    line-height: 1.25rem;
    div {
      border-radius: 0 !important;
    }
  }
  .form-input {
    display: flex;
    align-items: center;
  }
`;

export const TableWrapper = styled.div`
  padding: 15px;
  background: ${props => (props.theme.colorScheme === 'dark' ? props.theme.backgrounds.primary : '#fff')};
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 36px;
    line-height: 24px;
    margin-top: 15px;
    margin-bottom: 0;
    display: flex;
  }
  .paginatedTable,
  .filters,
  .tableFooter {
    background: ${props => (props.theme.colorScheme === 'dark' ? props.theme.backgrounds.primary : '#fff')};
    .tableRow {
      border: 2px solid ${props => props.theme.borders.tableRow};

      /* &:hover {
        border: 2px solid #2bc0d8;
      } */
    }
  }
  .tableAction {
    margin: 24px 0 36px 0;
  }
`;

export const RemoveModalHeader = styled.h3`
  font-size: 24px;
  line-height: 24px;
  padding-top: 32px;
`;
export const RemoveModalParagraph = styled.p`
  font-size: 16px;
  line-height: 24px;
  span {
    font-weight: bold;
  }
`;

export const AddButtonContent = styled.span`
  display: inline-flex;
  align-content: center;
  gap: 10px;
  & > span:nth-child(1) {
    font-size: 28px;
  }
  & > span:nth-child(2) {
    font-size: 16px;
    line-height: 28px;
  }
`;
