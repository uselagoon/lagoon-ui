import React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import {StyledDropdown, DropdownMenu, DropdownButton} from "./StyledHeaderMenu";

const useOutsideClick = (callback) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      const handleClick = (event) => {
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

const HeaderMenu = ({auth}) => {
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
          <a key="settings" className="settings" href="/settings">
            Settings
          </a>,
          <hr key="line"/>,
          <a key="projects" className="menuitem" href="/projects">
            Your projects
          </a>,
          publicRuntimeConfig.LAGOON_UI_YOUR_ACCOUNT_DISABLED == null && (
            <a
              key="account"
              className="menuitem"
              href={`${publicRuntimeConfig.KEYCLOAK_API}/realms/lagoon/account`}
            >
              Your account
            </a>
          ),
          <hr key="lastline"/>,
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
              <li key={index} className="menu-item">{menuItem}</li>
            ))}
          </DropdownMenu>
        ) : null}
      </StyledDropdown>
    </>
    );
  };

export default HeaderMenu;