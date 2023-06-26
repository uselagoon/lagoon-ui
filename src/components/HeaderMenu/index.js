import React from 'react';

import getConfig from 'next/config';
import Link from 'next/link';

import { DropdownButton, DropdownMenu, StyledDropdown } from './StyledHeaderMenu';

const { publicRuntimeConfig } = getConfig();

const useOutsideClick = callback => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setTimeout(() => {
          callback();
        });
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};

const HeaderMenu = ({ auth }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOutside = () => {
    setOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  return (
    <>
      <Dropdown
        open={open}
        trigger={
          <DropdownButton ref={ref} onClick={handleOpen}>
            {auth.user.username}
          </DropdownButton>
        }
        menu={[
          <Link key="settings" href="/settings" prefetch>
            <a key="settings" className="settings">
              Settings
            </a>
          </Link>,
          <hr key="line" />,
          <Link key="projects" href="/projects" prefetch>
            <a key="projects" className="menuitem">
              Your projects
            </a>
          </Link>,
          <Link key="organizations" href="/organizations" prefetch>
            <a key="organizations" className="menuitem">
              Your organizations
            </a>
          </Link>,

          publicRuntimeConfig.LAGOON_UI_YOUR_ACCOUNT_DISABLED == null && (
            <Link href={`${publicRuntimeConfig.KEYCLOAK_API}/realms/lagoon/account`} passHref>
              <a key="account" className="menuitem">
                Your account
              </a>
            </Link>
          ),
          <hr key="lastline" />,
          <a key="logout" className="logout" onClick={auth.logout}>
            Sign out
          </a>,
        ]}
      />
    </>
  );
};

const Dropdown = ({ open, trigger, menu }) => {
  return (
    <>
      <StyledDropdown>
        {trigger}
        {open ? (
          <DropdownMenu>
            {menu.map((menuItem, index) => (
              <li key={index} className="menu-item">
                {menuItem}
              </li>
            ))}
          </DropdownMenu>
        ) : null}
      </StyledDropdown>
    </>
  );
};

export default HeaderMenu;
