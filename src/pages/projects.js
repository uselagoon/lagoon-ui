import React, { useEffect } from 'react';

import Head from 'next/head';

import { useQuery } from '@apollo/react-hooks';
import Projects from 'components/Projects';
import ProjectsSkeleton from 'components/Projects/ProjectsSkeleton';
import MainLayout from 'layouts/MainLayout';
import AllProjectsQuery from 'lib/query/AllProjects';

import QueryError from '../components/errors/QueryError';
import { CommonWrapper } from '../styles/commonPageStyles';
import { useTourContext } from '../tours/TourContext';

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {
  const { startTour } = useTourContext();

  const { data, loading, error } = useQuery(AllProjectsQuery, {
    displayName: 'AllProjectsQuery',
  });

  useEffect(() => {
    // tour only starts running if there's at least one project the user can view
    if (!loading && data.allProjects.length) {
      startTour();
    }
  }, [loading]);

  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2 data-cy="projectsTitle">Projects</h2>
          <div className="content">
            {loading ? <ProjectsSkeleton /> : <Projects projects={data.allProjects || []} />}
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};
export default ProjectsPage;
