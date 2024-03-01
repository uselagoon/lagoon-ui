import React, { FC, MouseEvent, ReactNode } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { ButtonElem, LinkElement } from './StyledButton';

interface ButtonProps {
  action: (e: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  variant?: string;
  icon?: string;
  testId?: string;
}

const Button: FC<ButtonProps> = ({
  action = undefined,
  href = undefined,
  disabled,
  loading,
  children,
  variant,
  icon,
  testId,
}) => {
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

  const buttonTestProps = testId ? { ['data-cy']: testId } : {};

  const ButtonElement = href ? (
    <LinkElement className={createClassName()} href={href}>
      {icon && <i {...buttonTestProps} className={icon} />} {children}
    </LinkElement>
  ) : (
    <ButtonElem
      style={{ display: 'inline-block' }}
      className={createClassName()}
      onClick={onClick}
      disabled={loading || disabled}
      {...buttonTestProps}
    >
      {icon && (typeof icon === 'string' ? <i className={`icon ${icon}`} /> : icon)}

      {!icon && children}

      {loading && <LoadingOutlined style={{ marginLeft: '0.5rem' }} />}
    </ButtonElem>
  );

  return <>{ButtonElement}</>;
};

export default Button;
