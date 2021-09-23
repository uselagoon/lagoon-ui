import { useRouter } from 'next/router';

import { Label, Icon, Menu, Header, Divider } from 'semantic-ui-react';
import Footer from 'components/Footer';

import Link from 'next/link';
import { color } from 'lib/variables';

const Navigation = ({ children }) => {
  const router = useRouter();

  return (
  <>
    <Menu vertical>
      <Menu.Item header>
        <Icon name="grid layout"/>
        <Link href="/projects">
          <a className={`${router.pathname === "/projects" ? 'active' : 'not-active'}`}>
            All Projects
          </a>
        </Link>
      </Menu.Item>
      <Divider />
        {children && 
          <Menu.Item>
            <Menu.Menu>
              {children}
            </Menu.Menu>
          </Menu.Item>
        }
        <Menu.Item>
          <Header size="small">User</Header>
          <Menu.Menu>
            <Menu.Item
              name="settings"
              href="/settings"
            >
              Settings
            </Menu.Item>
            <Menu.Item
              name="docs"
              target="_blank"
              href="https://docs.lagoon.sh"
            >
              Docs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Footer />
    </Menu>
    <style jsx>{`
      .active {
        color: ${color.brightBlue};
      }
    `}</style>
  </>
  );
};

export default Navigation;