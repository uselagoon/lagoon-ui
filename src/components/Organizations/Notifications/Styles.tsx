import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const NotificationsWrapper = styled.div`
  .content-wrapper {
    @media ${bp.tabletUp} {
      display: flex;
      justify-content: space-between;
    }
  }
  flex-grow: 1;
  padding: 40px calc((100vw / 16) * 1);
  .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }

  .details {
    transform: translateX(-28px);
    width: 100%;
    @media ${bp.xs_smallUp} {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      width: 100%;
    }

    .field-wrapper {
      &::before {
        left: calc(((-100vw / 16) * 1.5) - 28px);
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
        min-width: 20%;
        width: 20%;
      }

      &.environmentType {
        &::before {
          background-size: 20px 20px;
        }
      }
    }
  }
`;

export const StyledOrgNotifications = styled.div`
  width: 95.83%;
  padding-top: 22px;
  padding-inline: 12px;
  display: flex;
  flex-direction: column;
  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 20%;
    align-self: center;
    gap: 0.5rem;

    .link {
      border: 1px solid #4578e6 !important;
      background: #fff;
      display: flex;
      height: 36px;
      width: 54px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #e4e4e4;
      }
    }
    .edit,
    .remove {
      svg {
        height: 22px;
        width: 22px;
      }
    }
    .edit {
      svg {
        color: #4578e6;
      }
    }
  }
  .remove {
    height: 36px;
    width: 54px;
    span {
      height: 36px;
    }
    button {
      height: 100%;
      width: 100%;
    }
    > * {
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
  .name {
    font-family: 'roboto', sans-serif;
    font-size: 1rem;

    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .notiftype {
    font-family: 'roboto', sans-serif;
    font-size: 1rem;

    color: ${color.darkGrey};
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .notificationdata {
    font-family: 'roboto', sans-serif;
    font-size: 1rem;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin: unset;
      line-height: 24px;
    }
    word-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }

  .notifdata {
    font-family: 'roboto', sans-serif;
    font-size: 1rem;
    border-right: 2px solid ${props => props.theme.borders.tableRow};
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem 0.25rem;

    width: 55%;
    p {
      margin: unset;
    }
    word-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;

    padding-left: 0.5rem;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .channel {
    font-family: 'roboto', sans-serif;
    font-size: 1rem;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .emailAddress {
    font-family: 'roboto', sans-serif;
    font-size: 1rem;

    width: 55%;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .default-group-label {
    color: ${color.white};
    background-color: ${color.black};
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .slack-group-label {
    color: ${color.white};
    background-color: ${color.blue};
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .discord-group-label {
    color: ${color.white};
    background-color: #5865f2;
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .rocketchat-group-label {
    color: ${color.white};
    background-color: ${color.teal};
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .email-group-label {
    color: ${color.black};
    background-color: ${color.lightGreen};
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .microsoftteams-group-label {
    color: ${color.black};
    background-color: ${color.lightestBlue};
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .webhook-group-label {
    color: ${color.white};
    background-color: ${color.lightRed};
    margin-left: 5px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .newGroup {
    background: ${color.midGrey};
    padding: 15px;
    @media ${bp.smallOnly} {
      margin-bottom: 20px;
      order: -1;
      width: 100%;
    }
  }
  .form-box input,
  textarea {
    display: inline-block;
    width: 50%;
    border-width: 1px;
    border-style: solid;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'roboto', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #5f6f7a;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  .select {
    font-family: 'source-sans-pro', sans-serif;
    line-height: 1.25rem;
    div {
      border-radius: 0 !important;
    }
  }
  label {
    padding-left: 20px;
    padding-right: 15px;
  }

  ${sharedTableStyles}
  .data-table {
    border: none;
  }
  .data-row {
    min-height: 63px;
    height: max-content;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    transition: 0.3s ease;
    border: none !important;
    justify-content: flex-start !important;
    background: ${props => props.theme.backgrounds.box};
    &:not(:last-child) {
      border-bottom: 2px solid ${props => props.theme.borders.tableRow} !important;
    }

    display: flex;
    align-items: stretch !important;
    & > * {
      height: unset !important;
    }
  }
  .description {
    line-height: 24px;
  }
`;

export const NameTagColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`;

export const NameTagCol = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-right: 2px solid ${props => props.theme.borders.tableRow};
  padding-inline: 11px;
`;

export const AddNotifButton = styled.div`
  width: max-content;
  margin: 2rem 0;
`;
