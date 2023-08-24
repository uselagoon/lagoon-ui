import { bp, color } from 'lib/variables';
import styled, { css } from 'styled-components';

const sharedStyles = css`
  display: inline-block;
  background-color: ${color.lightBlue};
  border: none;
  border-radius: 3px;
  color: ${color.white};
  cursor: pointer;
  &:not(:has(span[role="img"])){
    padding: 10px 30px;
  }
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
  &.btn-white {
    // background-color: ${color.white};
    background: transparent;
    color:  ${color.blue};
    border: 1px solid ${color.blue};
    &.btn--disabled {
      background-color: ${color.lightestGrey};
      &:hover,
      &:active {
        background-color: ${color.lightestGrey};
      }
    }
    &:hover {
      background-color: ${color.lightestGrey};
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

  &.icon {
    display: flex;
    padding: 0 10px;
  }

  i {
    background-repeat: no-repeat;
    background-position: center;
  }

  i.icon {
    width: 24px;
    height: 24px;
  }

  i.view {
    background-image: url('/static/images/view.svg');
    width: 48px;
    height: 36px;
  }

  i.edit {
    background-image: url('/static/images/edit.svg');
    width: 48px;
    height: 36px;
  }

  i.bin {
    background-image: url('/static/images/bin.svg');
    width: 48px;
    height: 36px;
  }
`;

export const LinkElement = styled.a`
  ${sharedStyles}
`;

export const ButtonElem = styled.button`
  ${sharedStyles}
`;
