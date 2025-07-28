import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameWithEnvVars from 'lib/query/organizations/OrganizationByNameWithEnvVars';

import OrganizationVariables from '../../components/Organizations/Variables';
import VariablesSkeleton from '../../components/Organizations/Variables/VariablesSkeleton';
import QueryError from '../../components/errors/QueryError';
import { VariableWrapper } from '../../styles/pageStyles';

/**
 * Displays a list of all variables for an organization.
 */

export const PageOrganizationVariables = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationByNameWithEnvVars, {
    variables: { name: router.query.organizationSlug },
  });

  const handleRefetch = async () => await refetch({ name: data.organization.name });

  if (loading || !data) {
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
              orgFriendlyName={router.query.orgFriendlyName}
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
          </Breadcrumbs>
          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="variables" />
            <VariableWrapper>
              <div className="content">
                <div className="notification">
                  A deployment is required to apply any changes to Organization variables.
                </div>
                <VariablesSkeleton />
              </div>
            </VariableWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error || error) {
    return <QueryError error={error} />;
  }

  const organization = data.organization;

  return (
    <>
      <Head>
        <title>{`${organization.name} | Organization`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb
            orgFriendlyName={organization.friendlyName}
            organizationSlug={organization.name}
            organizationId={organization.id}
          />
        </Breadcrumbs>
        <OrganizationsWrapper>
          <OrgNavTabs activeTab="variables" organization={organization} />
          <VariableWrapper>
            <div className="content">
              <div className="notification">
                A deployment is required to apply any changes to Organization variables.
              </div>
              <OrganizationVariables organization={organization} onVariableAdded={handleRefetch} />
            </div>
          </VariableWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageOrganizationVariables);
