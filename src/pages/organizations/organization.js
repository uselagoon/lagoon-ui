import React, { useEffect } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import Organization from 'components/Organizations/Organization';
import OrganizationSkeleton from 'components/Organizations/Organization/OrganizationSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameQuery from 'lib/query/organizations/OrganizationByName';

import { useTourContext } from '../../../src/tours/TourContext';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a organization page, given the organization id.
 */
export const PageOrganization = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationByNameQuery, {
    variables: { name: router.query.organizationSlug },
  });

  const { startTour } = useTourContext();

  useEffect(() => {
    if (!loading && data.organization) {
      startTour();
    }
  }, [loading]);

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
            <OrgNavTabsSkeleton activeTab="overview" />
            <div className="content">
              <OrganizationSkeleton />
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
          <OrganizationBreadcrumb organizationSlug={data.organization.id} organizationName={data.organization.name} />
        </Breadcrumbs>
        <OrganizationsWrapper>
          <OrgNavTabs activeTab="overview" organization={data.organization} />
          <div className="content">
            <Organization organization={organization} refetch={refetch} />
          </div>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageOrganization);
