import React from 'react';
import { bp, color } from 'lib/variables';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const useOutsideClick = (callback) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
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
      trigger={<a ref={ref} className="dropdown-btn" onClick={handleOpen}>{auth.user.username}</a>}
      menu={[
        <a className="settings" href="/settings">Settings</a>,
        <hr />,
        <a className="account" href={`${publicRuntimeConfig.KEYCLOAK_API}/realms/lagoon/account`}>Your account</a>,
        <hr />,
        <a className="logout" onClick={auth.logout}>Sign out</a>
      ]}
    />
    <style jsx>{`
    .dropdown-btn {
        display: flex;
        align-items: center;
        background-color: transparent;
        color: ${color.white};
        cursor: pointer;
        padding-left: 10px;
        @media ${bp.tinyUp} {
          align-self: auto;
        }
        height: 100%;
        &::after {
          background-position: center center;
          background-repeat: no-repeat;
          content: '';
          display: inline-block;
          transition: all 0.3s ease-in-out;
          height: 10px;
          width: 25px;
          background-image: url('/static/images/profile-dropdown.svg');
          background-size: 9px;
        }
    }
    hr {
        border: 1px solid ${color.blue};
    }
    a {
        color: ${color.almostWhite};
        &.settings {
          align-items: center;
          cursor: pointer;
          display: flex;
          &::before {
            background-position: center center;
            background-repeat: no-repeat;
            content: '';
            display: block;
            height: 35px;
            transition: all 0.3s ease-in-out;
            width: 35px;
            color: ${color.white};
            background-image: url('/static/images/cog.svg');
            background-size: 18px;
          }
        }
        &.account {
          align-items: center;
          cursor: pointer;
          display: flex;
          &::before {
            background-position: center center;
            background-repeat: no-repeat;
            content: '';
            display: block;
            height: 35px;
            transition: all 0.3s ease-in-out;
            width: 35px;
            background-image: url('/static/images/account.svg');
            background-size: 18px;
          }
        }
        &.logout {
          align-items: center;
          cursor: pointer;
          display: flex;
          &::before {
            background-position: center center;
            background-repeat: no-repeat;
            content: '';
            display: block;
            height: 35px;
            transition: all 0.3s ease-in-out;
            width: 35px;
            background-image: url('/static/images/logout.svg');
            background-size: 18px;
          }
        } 
      }
    `}</style>
    </>
  );
};

const Dropdown = ({ open, trigger, menu }) => {
    return (
    <>
      <div className="dropdown">
        {trigger}
        {open ? (
          <ul className="menu">
            {menu.map((menuItem, index) => (
              <li key={index} className="menu-item">{menuItem}</li>
            ))}
          </ul>
        ) : null}
      </div>
        <style jsx>{`
        .dropdown {
            border-left: 1px solid ${color.blue};
            cursor: pointer;
            padding: 10px 20px;
        }
        
        .menu {
            position: absolute;
            z-index: 9;
            list-style-type: none;
            padding: 0;
            right: 20px;
            width: 200px;
            background-color: ${color.lightBlue};
            border: 2px solid ${color.blue};
            border-radius: 8px;
        }
        .menu-item {
            padding: 0px;
            &:hover {
                background-color: ${color.blue};
            }
        }
    
        .menu > li {
            margin: 0px;
        }
        
        .menu > ul {
            padding: 0px;
        }
        
    
        `}</style>
    </>
    );
  };

export default HeaderMenu;