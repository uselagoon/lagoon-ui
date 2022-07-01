import React, { useReducer, useState, useEffect, useRef, useCallback } from 'react';

import Link from 'next/link';
import getConfig from 'next/config';
import { AuthContext } from 'lib/KeycloakProvider';
import { color } from 'lib/variables';
import PrimaryMenu from 'components/PrimaryMenu';
import lagoonLogo from '!svg-inline-loader?classPrefix!./lagoon.svg';
import { RepoIcon } from '@primer/octicons-react';
import { Search, Grid, Icon, Menu, Label, Dropdown } from 'semantic-ui-react';

const { publicRuntimeConfig } = getConfig();

function regExpEscape(literal_string) {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

/**
 * Displays the header using the provided logo.
 */
const Header = ({ projects, logo }) => {
  const initialState = {
    loading: false,
    results: projects ? projects : [],
    value: '',
  }

  const [resultsMenuOpen, setResultsMenuOpen] = useState(false);

  const [state, dispatch] = useReducer(searchResultsReducer, [initialState]);
  const { loading, results, value } = state;

  function searchResultsReducer(state, action) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query }
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results }
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection }

      default:
        throw new Error()
    }
  }

  const timeoutRef = useRef();

  const onSearchFocus = useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: "" })

    timeoutRef.current = setTimeout(() => {
      dispatch({
        type: 'FINISH_SEARCH',
        results: projects,
      })
    }, 300);

    setResultsMenuOpen(true)
  }, [projects]);

  const onSearchBlur = useCallback((e, data) => {
    setResultsMenuOpen(false)
  })


  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value == undefined || data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return;
      }

      const re = new RegExp(regExpEscape(data.value.length != 0 && data.value), 'i');
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: 'FINISH_SEARCH',
        results: projects.filter(isMatch),
      })
    }, 300)
  }, []);
  
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, []);

  const resultRenderer = ({ title, href }) => {
    return (
      <Label>
        <RepoIcon fill="#000" size="small" />
        <span className="icon-spacing">{title}</span>
      </Label>
    )
  }

  return (
    <div className="header">
      <Grid columns={4} stretched verticalAlign='middle'>
        <Grid.Column className="logo no-padding-bottom" width={1}>
            <Link href="/">
              <a className="home">
                <img
                  alt="Home"
                  src={logo ? logo : `data:image/svg+xml;utf8,${
                    publicRuntimeConfig.LAGOON_UI_ICON
                    ? publicRuntimeConfig.LAGOON_UI_ICON
                    : encodeURIComponent(lagoonLogo)
                  }`}
                />
              </a>
            </Link>
        </Grid.Column>
        <Grid.Column className="search-container no-padding-bottom" width={7}>
          <div className="search-wrapper flex-column flex-md-row width-full flex-order-2 flex-md-order-none mr-0 mt-3 mt-md-0">
            <Search
              loading={loading}
              className="search-input"
              placeholder="Search..."
              onResultSelect={(e, data) =>
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
              }
              onSearchChange={handleSearchChange}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              resultRenderer={resultRenderer}
              results={results}
              open={resultsMenuOpen}
              value={value}
            />
          </div>
          <div className="flex-column flex-md-row flex-self-stretch flex-md-self-auto">
              <PrimaryMenu />
          </div>
        </Grid.Column>
        <Grid.Column className="no-padding-bottom" width={4}></Grid.Column>
        <Grid.Column className="no-padding-bottom" width={4}>
          <AuthContext.Consumer>
            {auth => {
              const trigger = (auth.authenticated &&
                <span>
                  <Icon name='user outline' /> Hello, {auth.user.username}
                </span>
              );

              const options = [
                {
                  key: 'user',
                  text: (
                    <span>
                      Signed in as <strong>{auth.authenticated && auth.user.username}</strong>
                    </span>
                  ),
                  disabled: true,
                },
                { key: 'profile', text: 'Profile', onClick: () => auth.logout()},
                { 
                  key: 'logout',
                  onClick: () =>  auth.logout(),
                  text: 'Sign Out'
                },
              ];

              if (auth.authenticated) {
                return (
                  <Menu className="header-menu" secondary>
                    <Menu.Item>
                      <Link
                        name="settings"
                        href="/settings" 
                        className="settings"
                      >
                        <a><Icon name="cogs" /> Settings</a>
                      </Link>
                    </Menu.Item>
                    <Dropdown item trigger={trigger} options={options} />
                  </Menu>
                );
              }
              return null;
            }}
          </AuthContext.Consumer>
        </Grid.Column>
      </Grid>
      <style jsx>{`
        .header {
          position: fixed;
          z-index: 110;
          height: 55px;
          width: 100%;

          background: ${color.white};
          border-bottom: 1px solid #D3DAE6;

          a {
            padding: 7px 14px;
            &.home {
              position: relative;
              max-width: 65px;

              img {
                display: block;
                height: 36px;
                width: auto;
              }
            }
            &.settings, .logout {
              cursor: pointer;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
