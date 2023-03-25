import styled, { css } from "styled-components";
import { bp, color } from "lib/variables";

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
    color: ${color.white};
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

  &.btn-small {
    display: inline-block;
    background-color: ${color.lightBlue};
    border: none;
    border-radius: 3px;
    color: ${color.white};
    cursor: pointer;
    padding: 8px;
    margin: 8px;
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
    }
  }
`;

export const LinkElement = styled.a`
  ${sharedStyles}
`;

export const ButtonElem = styled.button`
  ${sharedStyles}
`;
