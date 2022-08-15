import React, { useReducer, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';

import { useQuery } from "@apollo/client";
import MostActiveProjects from 'lib/query/MostActiveProjects';

import { AuthApolloClient } from 'lib/ApiConnection';
import { AuthContext } from 'lib/KeycloakProvider';

import PrimaryMenu from 'components/PrimaryMenu';
import { Search, Grid, Icon, Menu, Label, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import lagoonLogo from '!svg-inline-loader?classPrefix!./lagoon.svg';
import { RepoIcon } from '@primer/octicons-react';
import { color } from 'lib/variables';

const { publicRuntimeConfig } = getConfig();

function regExpEscape(literal_string) {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

const MAX_RESULTS_SHOWN = 5;

/**
 * Displays the header using the provided logo.
 */
const Header = ({ logo }) => {
  const apolloClient = AuthApolloClient();
  const [resultsMenuOpen, setResultsMenuOpen] = useState(false);
  const router = useRouter();

  const { loading: loadingProjects, projectsError, data: { uiProjects: projects } = {}} = apolloClient && useQuery(MostActiveProjects, {
    variables: {
      // limit: 25,
      // skip: 0
    },
  }) || {};

  const resultRenderer = ({ name }) => {
    return (
      <div name={name}>
        <Link href={`/projects/${name}`}>
          <a className={""}>
            <Label>
              <RepoIcon fill="#000" size="small" />
              <span className="icon-spacing">{name}</span>
            </Label>
          </a>
        </Link>
      </div>
    )
  }

  const mapToSearchResult = (results = []) => results.map(o => ({
    childKey: o.id,
    id: o.id,
    name: o.name,
    title: o.name,
    image: '',
    shortdesc: o.shortDescription || '',
    fulldesc: o.fullDescription || ''
  }));

  const initialState = {
    loading: false,
    results: !loadingProjects ? mapToSearchResult(projects) : [],
    value: '',
  }

  const [state, dispatch] = useReducer(searchResultsReducer, [initialState]);
  const { loading, results, value } = state;


  const noResults = () => {
    if (results && results.length === 0) {
      return "No results"
    }
    else {
      return (
        <div style={{ padding: '1em' }}>
          <Dimmer active inverted>
            <Loader size='mini'>Loading</Loader>
          </Dimmer>
        </div>
      )
    }
  }

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
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: "" });

    // Bug: convert results into new object since some semantic-ui props are enforced
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/1141
    const convResults = projects ? mapToSearchResult(projects) : []

    timeoutRef.current = setTimeout(() => {
      if (data.value == undefined || data.value == "") {
        dispatch({
          type: 'FINISH_SEARCH',
          results: convResults
        })
        return;
      }
      else {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' })
          return;
        }
  
        dispatch({
          type: 'FINISH_SEARCH',
          results: convResults
        })
      }
    }, 300);

    setResultsMenuOpen(true);
  }, [projects]);

  const onSearchBlur = useCallback((e, data) => {
    setResultsMenuOpen(false)
  })

  const handleSearchChange = useCallback((e, data) => {

    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

   const convResults = projects ? mapToSearchResult(projects) : []

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return;
      }

      const re = new RegExp(regExpEscape(data.value.length != 0 && data.value), 'i');
      const isMatch = (result) => re.test(result.name);

      dispatch({
        type: 'FINISH_SEARCH',
        results: projects ? convResults.filter(isMatch) : [],
      })
    }, 300)
  }, [projects]);
  
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, []);


  if (results) {
    results.splice(MAX_RESULTS_SHOWN)
  }

  return (
    <div className="header">
      <Grid columns={3} stretched verticalAlign='middle'>
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
              loading={loadingProjects}
              className="search-input"
              placeholder="Search..."
              onResultSelect={(e, data) =>
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.name })
              }
              onSearchChange={handleSearchChange}
              onFocus={onSearchFocus}
              disabled={!projects || loadingProjects}
              onBlur={onSearchBlur}
              resultRenderer={resultRenderer}
              results={results}
              noResultsMessage={noResults()}
              open={resultsMenuOpen}
              // minCharacters={0}
              value={value}
            />
          </div>
          <div className="flex-column flex-md-row flex-self-stretch flex-md-self-auto">
              <PrimaryMenu />
          </div>
        </Grid.Column>
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
                { key: 'profile', text: 'Profile', onClick: () => router.push("/profile")},
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
