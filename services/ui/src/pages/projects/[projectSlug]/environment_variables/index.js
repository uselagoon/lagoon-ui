import React, { useState, useEffect, Suspense } from 'react';
import { useQuery } from "@apollo/client";
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import { Grid, Icon, Message, Header, Menu } from 'semantic-ui-react';

import Link from 'next/link';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import EnvVarLink from 'components/link/EnvironmentVariables';

import { LoadingSpinner, LazyLoadingContent } from 'components/Loading';
import EnvironmentVariables from 'components/EnvironmentVariables';
import ToggleDisplay from 'components/ToggleDisplay';

import Me from 'lib/query/Me';

/**
 * Displays environment variables page.
 */
const EnvironmentVariablesPage = ({ router }) => {
  const [project, setProject] = useState([]);
  const [toggleDisplay, setToggleDisplay] = useState('list');

  // const { data, loading, error } = useQuery(Me, {
  //     displayName: "Me",
  //     fetchPolicy: "cache-and-network"
  // });

  const { data, loading, error } = useQuery(gql`
   query getProject($name: String!) {
    project: projectByName(name: $name) {
      id
      name
      envVariables {
        id
        name
        value
        scope
      }
      environments {
        id
        name
        envVariables {
          id
          name
          value
          scope
        }
      }
    }
   }`, { variables: { name: "high-cotton" }});

  const changeDisplay = () => {
    if (toggleDisplay == 'list') {
      setToggleDisplay('detailed')
    }
    if (toggleDisplay == 'detailed') {
      setToggleDisplay('list')
    }
  };

  useEffect(() => {
    if (!error && !loading && data) {
      // // Sort alphabetically by environmentType and then deployType
      // const environments = R.sortWith(
      //   [
      //     R.descend(R.prop('environmentType')),
      //     R.ascend(R.prop('deployType'))
      //   ],
      //   data.project.environments
      // );
      setProject(data.project);
    }
  }, [data, loading, error]);

  return(
  <>
    <Head>
      <title>{`${router.query.projectSlug} | Environment Variables`}</title>
    </Head>
    <MainLayout>
      <Grid centered>
          <Grid.Row>
            <Grid.Column width={2}>
              <MainNavigation>
                <Navigation>
                  <>
                    <div className="project-menu">
                      <Header size="small">Project</Header>
                      <Menu.Menu>
                        <Menu.Item
                          name="environment-variables"
                          href={`${router.query.projectSlug}/environment_variables`}
                          as={Link}
                        >
                          Environment Variables
                        </Menu.Item>
                      </Menu.Menu>
                    </div>
                  </>
                </Navigation>
              </MainNavigation>
            </Grid.Column>
            <Grid.Column width={14} style={{ padding: "0 4em" }}>
              {error &&
                <Message negative>
                  <Message.Header>Error: Unable to load environment variables</Message.Header>
                  <p>{`${error}`}</p>
                </Message>
              }
              {!loading && !project && !error &&
                <Message>
                  <Message.Header>No environment variables found</Message.Header>
                  <p>{`No environment variables  found for '${router.query.projectSlug}'`}</p>
                </Message>
              }
              {loading && <LoadingSpinner />}
              {!loading && !error && project &&
              <>
                <Breadcrumbs>
                  <ProjectBreadcrumb projectSlug={project.name} />
                </Breadcrumbs>
                <div className="env-var-wrapper">
                  <div className="header">
                    <Header>Environment Variables</Header>
                    <div className="actions">
                      <div className="add-env-var">
                        <EnvVarLink className="add">
                          <Icon link name="add circle"/> Add
                        </EnvVarLink>
                      </div>
                      <div className="toggle">
                        <ToggleDisplay
                          action={changeDisplay}
                          disabled={toggleDisplay === 'list'}
                          >
                          <Icon fitted color="black" name="list" />
                        </ToggleDisplay>
                        <ToggleDisplay
                          action={changeDisplay}
                          disabled={toggleDisplay === 'detailed'}
                          >
                          <Icon fitted color="black" name="th list" />
                        </ToggleDisplay>
                      </div>
                    </div>
                  </div>
                  <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                    <EnvironmentVariables variables={project.envVariables || {}} />
                  </Suspense>
                </div>
              </>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx>{`
          .env-var-wrapper {
            padding: 2em;

            .header {
              display: flex;
              justify-content: space-between;
            }

            .actions {
              display: flex;

              .add-env-var {
                padding-right: 1em;
              }
            }

            .add-env-var {
              padding: 0.725em;
              margin-right: 1em;
            }
          }
        `}</style>
    </MainLayout>
  </>
)};

export default withRouter(EnvironmentVariablesPage);
