import React, { useState, useEffect, Suspense } from "react";
import * as R from 'ramda';
import { withRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head';
import getConfig from 'next/config';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import NavTabs from 'components/NavTabs';
import { DEFAULT_BACKUPS_LIMIT } from 'lib/util';

import { Grid, Message } from 'semantic-ui-react';

const Backups = React.lazy(() => import('components/Backups'));

import { bp, color } from 'lib/variables';
import EnvironmentWithBackupsQuery from 'lib/query/EnvironmentWithBackups';
import BackupsSubscription from 'lib/subscription/Backups';
import { LoadingEnvironmentRows, LazyLoadingContent } from 'components/Loading';


const { publicRuntimeConfig } = getConfig();
const envLimit = publicRuntimeConfig.LAGOON_UI_BACKUPS_LIMIT || DEFAULT_BACKUPS_LIMIT;
const customMessage = publicRuntimeConfig.LAGOON_UI_BACKUPS_LIMIT_MESSAGE;
const backupsLimit = envLimit === -1 ? null : envLimit;

/**
 * Displays the backups page, given the name of an openshift project.
 */
export const PageBackups = ({ router }) => {
  const [environment, setEnvironment] = useState(); 
  const [resultsLimit, setResultsLimit] = useState({ value: parseInt(envLimit, 10), label: envLimit });
  const [visibleMessage, setVisibleMessage] = useState(true);

  const { loading, error, data, subscribeToMore, fetchMore } = useQuery(EnvironmentWithBackupsQuery, {
    variables: { 
      openshiftProjectName: router.query.environmentSlug,
      ...(resultsLimit && resultsLimit.label !== 'All' && { limit: resultsLimit.value })
    },
    fetchPolicy: 'network-only'
  });

  const resultsLimitOptions = (limits) => {
    return limits && limits.map(l => ({ value: isNaN(l) ? 0 : parseInt(l), label: l }));
  };

  const handleResultsLimitChange = (limit) => {
    setResultsLimit(limit);
  };

  const handleDismiss = () => {
    setVisibleMessage(false);
  }

  useEffect(() => {
    if (!error && !loading && data) {
      setEnvironment(data.environment);
    }

    if (environment) {
      const unsubscribe = subscribeToMore({
        document: BackupsSubscription,
        variables: { environment: environment.id },
        updateQuery: (prevStore, { subscriptionData }) => {
          if (!subscriptionData.data) return prevStore;
          const prevBackups =
            prevStore.environment.backups;
          const incomingBackup = subscriptionData.data.backupChanged;
          const existingIndex = prevBackups.findIndex(
            prevBackup => prevBackup.id === incomingBackup.id
          );
          let newBackups;

          // New backup.
          if (existingIndex === -1) {
            // Don't add new deleted backups.
            if (incomingBackup.deleted !== '0000-00-00 00:00:00') {
              return prevStore;
            }

            newBackups = [incomingBackup, ...prevBackups];
          }
          // Existing backup.
          else {
            // Updated backup
            if (incomingBackup.deleted === '0000-00-00 00:00:00') {
              newBackups = Object.assign([...prevBackups], {
                [existingIndex]: incomingBackup
              });
            }
            // Deleted backup
            else {
              newBackups = R.remove(existingIndex, 1, prevBackups);
            }
          }

          const newStore = {
            ...prevStore,
            environment: {
              ...prevStore.environment,
              backups: newBackups
            }
          };

          return newStore;
        }
      });

      return () => environment && unsubscribe();
    }
  }, [data, loading, error, subscribeToMore]);

  return (
    <>
      <Head>
        <title>{`${router.query.environmentSlug} | Backups`}</title>
      </Head>
      <MainLayout>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={2}>
              <MainNavigation>
                <Navigation />
              </MainNavigation>
            </Grid.Column>
            <Grid.Column width={14} style={{ padding: "0 4em" }}>
              {error &&
                <Message negative>
                  <Message.Header>Error: Unable to load backups</Message.Header>
                  <p>{`${error}`}</p>
                </Message>
              }
              {!loading && !environment && !error &&
                <Message>
                  <Message.Header>No backups found</Message.Header>
                  <p>{`No backups found for '${router.query.environmentSlug}'`}</p>
                </Message>
              }
              {loading && <LoadingEnvironmentRows delay={250} rows="15" type={"list"}/>}
              {!loading && environment &&
              <>
                <Breadcrumbs>
                  <ProjectBreadcrumb projectSlug={environment.project.name} />
                  <EnvironmentBreadcrumb
                    environmentSlug={environment.openshiftProjectName}
                    projectSlug={environment.project.name}
                  />
                </Breadcrumbs>
                <NavTabs activeTab="backups" environment={environment} />
                <div className="content">
                  {visibleMessage && environment && environment.backups && environment.backups.length <= envLimit && 
                    <Message info onDismiss={() => handleDismiss()}>
                      <Message.Header>{`Results have been limited (${backupsLimit})`}</Message.Header>
                      <p>{customMessage && `${customMessage}`}</p>
                    </Message>
                  }
                  <div className="notification">
                    If you need a current database or files dump, use the tasks
                    "drush sql-dump" or "drush archive-dump" in the new "Tasks"
                    section!
                  </div>
                  <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                    <Backups
                      backups={environment.backups}
                      resultsLimit={resultsLimit}
                      resultsLimitOptions={resultsLimitOptions}
                      handleResultsLimitChange={handleResultsLimitChange}
                      fetchMore={() => fetchMore({
                        variables: {
                          environment,
                          after: environment,
                        }
                      })}
                    />
                  </Suspense>
                </div>
              </>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx>{`
          .content-wrapper {
            @media ${bp.tabletUp} {
              display: flex;
              padding: 0;
            }
          }

          .content {
            padding: 32px calc((100vw / 16) * 1);
            width: 100%;
          }

          .notification {
            background-color: ${color.lightBlue};
            color: ${color.white};
            padding: 10px 20px;
          }
        `}</style>
      </MainLayout>
    </>
  )
};

export default withRouter(PageBackups);
