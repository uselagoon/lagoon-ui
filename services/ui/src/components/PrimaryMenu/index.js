import { useRouter } from 'next/router';
import { Label, Icon, Menu, Header, Divider } from 'semantic-ui-react';

import Link from 'next/link';
import { color } from 'lib/variables';

const PrimaryMenu = ({ children }) => {
  const router = useRouter();

  return (
  <>
    <Menu secondary>
      <Menu.Item>
        <Icon name="grid layout"/>
        <Link href="/projects">
          <a className={`${router.pathname === "/projects" ? 'active' : 'not-active'}`}>
            All Projects
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Icon name="group"/>
        <Link href="/groups">
          <a className={`${router.pathname === "/groups" ? 'active' : 'not-active'}`}>
            Groups
          </a>
        </Link>
      </Menu.Item>
      {children && 
        <Menu.Item>
          <Menu.Menu>
              {children}
            </Menu.Menu>
        </Menu.Item>
      }
    </Menu>
    <style jsx>{`
      .active {
        color: ${color.brightBlue};
      }
    `}</style>
  </>
  );
};

export default PrimaryMenu;