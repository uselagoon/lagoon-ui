import React, { FC, MouseEvent, ReactNode } from 'react';

import { ButtonElem, LinkElement } from './StyledButton';

interface ButtonProps {
  action: (e: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
  children?: ReactNode;
  variant?: string;
  icon?: string;
}

const Button: FC<ButtonProps> = ({ action = undefined, href = undefined, disabled, children, variant, icon }) => {
  const createClassName = () => {
    let className = `${variant ? `btn-${variant}` : 'btn'} ${disabled ? 'btn--disabled' : ''}`;
    if (icon) {
      className += `icon`;
    }
    return className;
  };

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
      {icon && <i className={icon} />} {children}
    </LinkElement>
  ) : (
    <ButtonElem className={createClassName()} onClick={onClick} disabled={disabled}>
      {icon && (typeof icon === 'string' ? <i className={`icon ${icon}`} /> : icon)}

      {!icon && children}
    </ButtonElem>
  );

  return <>{ButtonElement}</>;
};

export default Button;
