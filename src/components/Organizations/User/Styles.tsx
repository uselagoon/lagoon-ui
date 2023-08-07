import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const UserWrapper = styled.div`
  flex-grow: 1;
  padding: 40px calc((100vw / 16) * 1);

  .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }
`;

export const StyledUser = styled.section`
  .default-user-label {
    color: ${color.white};
    background-color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.borders.tableRow : color.black)};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    font-size: clamp(0.5rem, 0.65vw, 1.2rem);
    text-align: center;
    display: inline-block;
  }
  .group-name {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    width: 30%;
    font-weight: normal;
  }
  .roles {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    width: 50%;
    font-weight: normal;
  }
  .project-name {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    width: 80%;
    font-weight: normal;
  }
  .edit {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 5%;
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 5%;
  }
  .groups, .projects {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    width: 10%;
    font-weight: normal;
  }
  .form-box input,
  textarea {
    display: inline-block;
    width: 50%;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    color: #5f6f7a;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  label {
    padding-left: 20px;
    padding-right: 15px;
  }
  ${sharedTableStyles}
  .description {
    line-height: 24px;
  }
`;

export const Header = styled.div`
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

  .button-sort {
      color: #5f6f7a;
      position: relative;
      font-family: 'source-code-pro', sans-serif;
      font-size: 13px;
      font-size: 0.8125rem;
      line-height: 1.4;
      text-transform: uppercase;
      padding-left: 20px;
      border: none;
      background: none;
      cursor: pointer;
      width: 10%;

      &:after {
        position: absolute;
        top: 0;
        width: 20px;
        height: 20px;
      }

      &.ascending:after {
        content: ' \\25B2';
      }

      &.descending:after {
        content: ' \\25BC';
      }

      &:first-child {
        padding-left: 0;
      }
    }
`;