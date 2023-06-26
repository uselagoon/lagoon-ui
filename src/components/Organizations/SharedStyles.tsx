import { bp, color } from 'lib/variables';
import styled from 'styled-components';

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
