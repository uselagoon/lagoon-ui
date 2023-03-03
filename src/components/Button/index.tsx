import React, { FC } from "react";
import { LinkElement, ButtonElem } from "./StyledButton";

interface ButtonProps {
  action: () => void;
  href?: string;
  disabled?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  variant?: string;
}

const Button: FC<ButtonProps> = ({
  action = undefined,
  href = undefined,
  disabled,
  children,
  variant,
}) => {
  const createClassName = () =>
    `${variant ? `btn-${variant}` : "btn"} ${disabled ? "btn--disabled" : ""} `;
    
  const onClick = action
    ? action
    : (e: React.MouseEvent) => {
        if (disabled) {
          e.preventDefault();
          return false;
        }
      };

  const ButtonElement = href ? (
    <LinkElement className={createClassName()} href={href}>
      {children}
    </LinkElement>
  ) : (
    <ButtonElem
      className={createClassName()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonElem>
  );

  return <>{ButtonElement}</>;
};

export default Button;
