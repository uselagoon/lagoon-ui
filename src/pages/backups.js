import React, { useEffect, useState } from 'react';

import getConfig from 'next/config';
import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Backups from 'components/Backups';
import BackupsSkeleton from 'components/Backups/BackupsSkeleton';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import ResultsLimited from 'components/ResultsLimited';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithBackupsQuery from 'lib/query/EnvironmentWithBackups';
import * as R from 'ramda';
import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import { CommonWrapperWNotification } from '../styles/commonPageStyles';
import { useTourContext } from '../tours/TourContext';

const { publicRuntimeConfig } = getConfig();
const envLimit = parseInt(publicRuntimeConfig.LAGOON_UI_BACKUPS_LIMIT, 10);
const customMessage = publicRuntimeConfig.LAGOON_UI_BACKUPS_LIMIT_MESSAGE;

/**
 * Displays the backups page, given the name of an openshift project.
 */
export const PageBackups = ({ router }) => {
  const [resultLimit, setResultLimit] = useState(null);

  const { continueTour } = useTourContext();
  const { data, error, loading } = useQuery(EnvironmentWithBackupsQuery, {
    variables: {
      openshiftProjectName: router.query.openshiftProjectName,
      limit: resultLimit,
    },
  });

  useEffect(() => {
    let urlResultLimit = envLimit;
    if (typeof window !== 'undefined') {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let limit = params.get('limit');
      if (limit) {
        if (parseInt(limit.trim(), 10)) {
          urlResultLimit = parseInt(limit.trim(), 10);
        }
      }
    }
    setResultLimit(urlResultLimit === -1 ? null : urlResultLimit);
  }, []);

  useEffect(() => {
    if (!loading && data?.environment?.backups?.length) {
      continueTour();
    }
  }, [loading]);

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;

    return (
      <>
        <Head>
          <title>{`${router.query.openshiftProjectName} | Backups`}</title>
        </Head>
        <MainLayout>
          <>
            <Breadcrumbs>
              <ProjectBreadcrumb projectSlug={projectSlug} />
              <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
            </Breadcrumbs>
            <CommonWrapperWNotification>
              <NavTabsSkeleton
                activeTab="backups"
                projectName={projectSlug}
                openshiftProjectName={openshiftProjectName}
              />
              <div className="content">
                <div className="notification">
                  If you need a current database or files dump, use the tasks "drush sql-dump" or "drush archive-dump"
                  in the new "Tasks" section!
                </div>
                <BackupsSkeleton />
                <ResultsLimited
                  limit={resultLimit}
                  message={(!customMessage && '') || (customMessage && customMessage.replace(/['"]+/g, ''))}
                />
              </div>
            </CommonWrapperWNotification>
          </>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const environment = data?.environment;

  if (!environment) {
    return (
      <EnvironmentNotFound
        variables={{
          openshiftProjectName: router.query.openshiftProjectName,
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{`${router.query.openshiftProjectName} | Backups`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>
        <CommonWrapperWNotification>
          <NavTabs activeTab="backups" environment={environment} />
          <div className="content">
            <div className="notification">
              If you need a current database or files dump, use the tasks "drush sql-dump" or "drush archive-dump" in
              the new "Tasks" section!
            </div>
            <Backups backups={environment.backups} />
            <ResultsLimited
              limit={resultLimit}
              changeLimit={setResultLimit}
              results={environment.backups.length}
              message={(!customMessage && '') || (customMessage && customMessage.replace(/['"]+/g, ''))}
            />
          </div>
        </CommonWrapperWNotification>
      </MainLayout>
    </>
  );
};

export default withRouter(PageBackups);
