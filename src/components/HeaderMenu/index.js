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

const HeaderMenu = ({ auth, isOrganizationsPath }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOutside = () => {
    setOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Dropdown
        isOrganizationsPath={isOrganizationsPath}
        open={open}
        trigger={
          <DropdownButton data-cy="headerMenu" ref={ref} onClick={handleOpen}>
            {auth.user.username}
          </DropdownButton>
        }
        menu={[
          <Link key="settings" href="/settings" prefetch className="settings" data-cy="settings">
            Settings
          </Link>,
          <hr key="line" />,
          <Link key="projects" href="/projects" prefetch className="menuitem" data-cy="projects">
            Your projects
          </Link>,
          <Link key="organizations" href="/organizations" prefetch className="menuitem" data-cy="organizations">
            Your organizations
          </Link>,

          publicRuntimeConfig.LAGOON_UI_YOUR_ACCOUNT_DISABLED == null && (
              <Link key="account" href="/account" prefetch className="menuitem" data-cy="account">
                Your account
              </Link>
          ),
          <hr key="lastline" />,
          <a key="logout" data-cy="logout" className="logout" onClick={auth.logout}>
            Sign out
          </a>,
        ]}
      />
    </>
  );
};

const Dropdown = ({ open, trigger, menu, isOrganizationsPath }) => {
  return (
    <>
      <StyledDropdown $isOrganizationsPath={isOrganizationsPath}>
        {trigger}
        {open ? (
          <DropdownMenu data-cy="menuList">
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
