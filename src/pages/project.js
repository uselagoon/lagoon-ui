import React, { useEffect } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import Environments from 'components/Environments';
import EnvironmentsSkeleton from 'components/Environments/EnvironmentsSkeleton';
import ProjectDetailsSidebar from 'components/ProjectDetailsSidebar';
import SidebarSkeleton from 'components/ProjectDetailsSidebar/SidebarSkeleton';
import MainLayout from 'layouts/MainLayout';
import ProjectByNameQuery from 'lib/query/ProjectByName';
import useTranslation from 'lib/useTranslation';
import * as R from 'ramda';

import ProjectNotFound from '../components/errors/ProjectNotFound';
import QueryError from '../components/errors/QueryError';
import { ProjectDetailsWrapper } from '../styles/pageStyles';
import { useTourContext } from '../tours/TourContext';

/**
 * Displays a project page, given the project name.
 */
export const PageProject = ({ router }) => {
  const t = useTranslation();
  const { continueTour } = useTourContext();
  const { data, error, loading } = useQuery(ProjectByNameQuery, {
    variables: { name: router.query.projectName },
  });

  useEffect(() => {
    if (!loading) {
      continueTour();
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <Head>
          <title>{`${router.query.projectName} | Project`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={router.query.projectName} />
          </Breadcrumbs>
          <ProjectDetailsWrapper>
            <div className="project-details-sidebar">
              <SidebarSkeleton />
            </div>
            <div className="environments-wrapper">
              <h3>{t('project.environments')}</h3>
              <EnvironmentsSkeleton />
            </div>
          </ProjectDetailsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const project = data?.project;

  if (!project) {
    return <ProjectNotFound variables={{ name: router.query.projectName }} />;
  }
  // Sort alphabetically by environmentType and then deployType
  const environments = R.sortWith(
    [R.descend(R.prop('environmentType')), R.ascend(R.prop('deployType'))],
    project.environments
  );

  return (
    <>
      <Head>
        <title>{`${router.query.projectName} | Project`}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={project.name} />
        </Breadcrumbs>
        <ProjectDetailsWrapper>
          <div className="project-details-sidebar">
            <ProjectDetailsSidebar project={project} />
          </div>
          <div className="environments-wrapper">
            <h3>{t('project.environments')}</h3>
            {!environments.length && <p>{t('project.noEnvironments')}</p>}
            <Environments environments={environments} project={project} />
          </div>
        </ProjectDetailsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageProject);
