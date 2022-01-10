import { useRouter } from 'next/router';

import { Label, Icon, Menu, Header, Divider } from 'semantic-ui-react';
import Footer from 'components/Footer';

import Link from 'next/link';
import { color } from 'lib/variables';

const Navigation = ({ children }) => {
  const router = useRouter();

  return (
  <>
    <Menu className="sidebar-navigation" vertical>
      <Menu.Item header>
        <Icon name="grid layout"/>
        <Link href="/projects">
          <a className={`${router.pathname === "/projects" ? 'active' : 'not-active'}`}>
            All Projects
          </a>
        </Link>
      </Menu.Item>
      <Divider />
      <Menu.Item header>
        <Icon name="group"/>
        <Link href="/groups">
          <a className={`${router.pathname === "/groups" ? 'active' : 'not-active'}`}>
            Groups
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
          <Header size="small">Manage</Header>
          <Menu.Menu className="submenu">
             <Menu.Item
              name="add-project"
              href="/add/project"
              as={Link}
            >
              Add Project
            </Menu.Item>
            <Menu.Item
              name="add-environment"
              href="/add/environment"
              as={Link}
            >
              Add Environment
            </Menu.Item>
            <Menu.Item
              name="add-envvar"
              href="/add/envvar"
              as={Link}
            >
              Add Environment Variable
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Header size="small">Help</Header>
          <Menu.Menu className="submenu">
            <Menu.Item
              name="settings"
              href="/settings"
              as={Link}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              name="docs"
              as={Link}
              target="_blank"
              href="https://docs.lagoon.sh"
            >
              Docs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Footer />
    </Menu>
  </>
  );
};

export default Navigation;
