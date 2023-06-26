import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import NewProject from 'components/Organizations/NewProject';
import OrgProjects from 'components/Organizations/Projects';
import OrgProjectsSkeleton from 'components/Organizations/Projects/OrgProjectsSkeleton';
import { ProjectDetails } from 'components/Organizations/Projects/Styles';
import MainLayout from 'layouts/MainLayout';
import OrganizationByIDQuery from 'lib/query/organizations/OrganizationByID';

import { OrganizationsWrapper } from '../../components/Organizations/SharedStyles';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the projects page, given the organization id
 */
export const PageOrgProjects = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationByIDQuery, {
    variables: { id: parseInt(router.query.organizationSlug, 10) },
  });
  const handleRefetch = async () => await refetch({ id: parseInt(router.query.organizationSlug, 10) });

  if (loading) {
    return (
      <>
        <Head>
          <title>
            {router.query.organizationName ? `${router.query.organizationName} | Organization` : 'Organization'}
          </title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationName={router.query.organizationName || ''}
            />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="projects" />

            <div className="projects-wrapper">
              <NewProject organizationId={''} options={[]} />

              <ProjectDetails className="details"></ProjectDetails>
              <OrgProjectsSkeleton />
            </div>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const organization = data.organization;

  if (!organization) {
    return <OrganizationNotFound variables={{ name: router.query.organizationSlug }} />;
  }

  return (
    <>
      <Head>
        <title>{`${organization.name} | Organization`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb organizationSlug={organization.id} organizationName={organization.name} />
        </Breadcrumbs>

        <OrganizationsWrapper>
          <OrgNavTabs activeTab="projects" organization={organization} />
          <div className="projects-wrapper">
            <ProjectDetails className="details">
              <div className="field-wrapper environmentType">
                <NewProject
                  organizationId={organization.id}
                  options={organization.deployTargets.map(deploytarget => {
                    return { label: deploytarget.name, value: deploytarget.id };
                  })}
                  refresh={handleRefetch}
                />
              </div>
            </ProjectDetails>

            <OrgProjects
              refresh={handleRefetch}
              projects={organization.projects}
              organizationId={organization.id}
              organizationName={organization.name}
            />
          </div>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageOrgProjects);
