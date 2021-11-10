import React from 'react';
import { bp, color } from 'lib/variables';

const Button = ({ action = null, href = null, disabled, children, variant }) => {
  const ButtonElement = href ? 'a' : 'button';
  const onClick = action
    ? action
    : e => {
        if (disabled) {
          e.preventDefault();
          return false;
        }
      };
  return (
    <>
      <ButtonElement
        onClick={onClick}
        href={href}
        disabled={disabled}
        className={`btn ${variant && `btn-${variant}`} ${disabled && 'btn--disabled'} `}
      >
        {children}
      </ButtonElement>
      <style jsx>
        {`
          .btn {
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
            }
          }

          .btn-red {
            background-color: ${color.lightRed};
            color: ${color.white};

            @media ${bp.tinyUp} {
              align-self: auto;
            }

            &:hover {
              background-color: ${color.red};
            }
          }

          .btn-green {
            background-color: ${color.lightGreen};
            color: ${color.white};

            @media ${bp.tinyUp} {
              align-self: auto;
            }

            &:hover {
              background-color: ${color.green};
            }
          }
        `}
      </style>
    </>
  );
};

export default Button;
