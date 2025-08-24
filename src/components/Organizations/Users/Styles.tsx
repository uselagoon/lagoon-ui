import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const UsersWrapper = styled.div`
  width: 95.83%;
  padding-top: 22px;
  padding-inline: 12px;
  display: flex;
  flex-direction: column;
`;

export const StyledUsers = styled.section`
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
  .firstName {
    font-family: 'source-code-pro', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};

    font-weight: normal;
  }
  .lastName {
    font-family: 'source-code-pro', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    font-weight: normal;
  }
  .email {
    font-family: 'source-code-pro', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    font-weight: normal;
    span {
      color: #fff;
    }
  }
  .attr {
    padding-left: 20px;
    width: 25%;
    @media ${bp.xs_smallOnly} {
      margin-left: 20px;
    }

    background-position: left 7px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
    display: flex;
    gap: 0.5rem;
    align-items: start;
    @media screen and (max-width: 1300px) {
      flex-wrap: wrap;
    }
    &.check {
      background-image: url('/static/images/successful.svg');
    }
  }
  .view {
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
  .groups,
  .attrs,
  .projects {
    font-family: 'source-code-pro', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
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
    font-size: 1rem;
    line-height: 1.5rem;
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
    font-size: 1rem;
    line-height: 1.5rem;
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

export const SkeletonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding-left: 2rem !important;
  & > .customer {
    width: 15%;
    &:nth-child(3) {
      width: 25%;
    }
  }
`;
