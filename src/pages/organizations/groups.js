import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import Groups from 'components/Organizations/Groups';
import GroupsSkeleton from 'components/Organizations/Groups/GroupsSkeleton';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameQuery, { OrgGroupMemberCountQuery } from 'lib/query/organizations/OrganizationByName.groups';

import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the groups page, given the openshift project name.
 */
export const PageGroups = ({ router }) => {
  const orgName = router.query.organizationSlug;

  const { data, error, loading, refetch } = useQuery(OrganizationByNameQuery, {
    variables: { name: orgName },
    onCompleted: initialData => {
      if (initialData && initialData.organization) {
        getMoreData();
      }
    },
  });

  const [getMoreData, { data: moreData, refetch: refetchMore }] = useLazyQuery(OrgGroupMemberCountQuery, {
    variables: { name: orgName },
  });

  const handleRefetch = async () => {
    await refetch({ id: parseInt(orgName, 10) });
    refetchMore();
  };

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
              orgFriendlyName={router.query.orgFriendlyName}
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="groups" />

            <GroupsSkeleton />
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

  if (moreData?.organization && organization) {
    const moreGroupsMap = new Map(moreData.organization.groups.map(g => [g.id, g]));

    const mergedGroups = data.organization.groups.map(group => {
      const matchingGroup = moreGroupsMap.get(group.id);
      return matchingGroup ? { ...group, memberCount: matchingGroup.memberCount } : group;
    });
    organization.groups = mergedGroups;
  }

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
          <OrgNavTabs activeTab="groups" organization={organization} />
          <Groups
            onGroupDeleted={handleRefetch}
            groups={organization.groups}
            organizationId={organization.id}
            organizationName={organization.name}
            orgFriendlyName={organization.friendlyName}
            refetch={handleRefetch}
          />
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageGroups);
