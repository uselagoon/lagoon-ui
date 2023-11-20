import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import NewProject from 'components/Organizations/NewProject';
import OrgHeader from 'components/Organizations/Orgheader';
import OrgProjects from 'components/Organizations/Projects';
import OrgProjectsSkeleton from 'components/Organizations/Projects/OrgProjectsSkeleton';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameQuery from 'lib/query/organizations/OrganizationByName';

import { OrganizationsWrapper } from '../../components/Organizations/SharedStyles';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the projects page, given the organization id
 */
export const PageOrgProjects = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationByNameQuery, {
    variables: { name: router.query.organizationSlug },
  });
  const handleRefetch = async () => await refetch({ name: router.query.organizationSlug });

  if (loading) {
    return (
      <>
        <Head>
          <title>
            {router.query.organizationSlug ? `${router.query.organizationSlug} | Organization` : 'Organization'}
          </title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="projects" />
            <div style={{ width: '100%' }}>
              <div style={{ padding: '2rem 0.75rem 0 0.75rem' }}>
                <OrgHeader headerText="Projects" searchBar />
              </div>

              <OrgProjectsSkeleton />

              <NewProject organizationId={''} options={[]} />
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
          <OrganizationBreadcrumb organizationSlug={organization.name} organizationId={organization.id} />
        </Breadcrumbs>

        <OrganizationsWrapper>
          <OrgNavTabs activeTab="projects" organization={organization} />
          <OrgProjects
            refresh={handleRefetch}
            projects={organization.projects}
            organizationId={organization.id}
            organizationName={organization.name}
            deployTargets={organization.deployTargets}
          />
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageOrgProjects);
