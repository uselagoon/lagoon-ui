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
          <Menu.Menu>
             <Menu.Item name="add-project">
              <Link href="/add/project">
                <a className={`${router.pathname === "/add/project" ? 'active' : 'not-active'}`}>
                  Add Project
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item name="add-environment">
              <Link href="/add/environment">
                <a className={`${router.pathname === "/add/environment" ? 'active' : 'not-active'}`}>
                  Add Environment
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item name="add-envvar">
              <Link href="/add/envvar">
                <a className={`${router.pathname === "/add/envvar" ? 'active' : 'not-active'}`}>
                  Add Environment Variable
                </a>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Header size="small">Help</Header>
          <Menu.Menu>
            <Menu.Item name="settings">
              <Link href="/settings">
                <a className={`${router.pathname === "/settings" ? 'active' : 'not-active'}`}>
                  Settings
                </a>
              </Link>
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