import { bp, color } from 'lib/variables';
import styled, { css } from 'styled-components';

const sharedStyles = css`
  display: inline-block;
  background-color: ${color.lightBlue};
  border: none;
  border-radius: 3px;
  color: ${color.white};
  cursor: pointer;
  padding: 10px 30px;
  @media ${bp.tinyUp} {
    align-self: auto;
  }

  &:hover {
    background-color: ${color.blue};
  }

  &.btn--disabled {
    background-color: ${color.lightestGrey};
    color: ${color.darkGrey};
    cursor: not-allowed;
    margin-right: 16px;
  }

  &.btn-red {
    background-color: ${color.lightRed};
    &.btn--disabled {
      background-color: ${color.lightestGrey};
      &:hover,
      &:active {
        background-color: ${color.lightestGrey};
      }
    }
    &:hover {
      background-color: ${color.red};
    }
  }
  &.btn-green {
    display: inline-block;
    background-color: ${color.green};
    border: none;
    border-radius: 3px;
    color: ${color.white};
    cursor: pointer;
    padding: 10px 30px;
    margin: auto;
    @media ${bp.tinyUp} {
      align-self: auto;
    }

    &:hover {
      background-color: ${color.green};
    }

    &.btn--disabled {
      background-color: ${color.midGrey};
      color: ${color.darkGrey};
      cursor: not-allowed;
      border-width: 1px;
      border-style: solid;
      border-radius: 3px;
      border-color: hsl(0, 0%, 85%);
    }
  }
`;

export const LinkElement = styled.a`
  ${sharedStyles}
`;

export const ButtonElem = styled.button`
  ${sharedStyles}
`;
