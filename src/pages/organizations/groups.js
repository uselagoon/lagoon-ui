import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import Groups from 'components/Organizations/Groups';
import GroupsSkeleton from 'components/Organizations/Groups/GroupsSkeleton';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameQuery from 'lib/query/organizations/OrganizationByName.groups';

import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the groups page, given the openshift project name.
 */
export const PageGroups = ({ router }) => {
  const orgName = router.query.organizationSlug;

  const [orgGroups, setOrgGroups] = useState(data?.organization?.groups || []);

  const { data, error, loading, refetch } = useQuery(OrganizationByNameQuery, {
    variables: { name: orgName },
  });

  useEffect(() => {
    if (data?.organization) {
      setOrgGroups(data?.organization.groups);
    }
  }, [data]);

  const updateGroupData = groupsWithMemberCount => {
    if (groupsWithMemberCount.length) {
      const prevGroups = [...orgGroups];
      const newGroupsMap = new Map(groupsWithMemberCount.map(group => [group.id, group]));

      const updatedGroups = prevGroups.map(group => {
        const found = newGroupsMap.get(group.id);
        return found ? { ...group, memberCount: found.memberCount } : group;
      });

      const groupsChanged = updatedGroups.some((group, index) => group.memberCount !== prevGroups[index]?.memberCount);

      if (groupsChanged) {
        setOrgGroups(updatedGroups);
      }
    }
  };

  const handleRefetch = async () => {
    const { data } = await refetch({ id: parseInt(orgName, 10) });
    setOrgGroups(data?.organization?.groups || []);
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
            groups={orgGroups}
            organizationId={organization.id}
            organizationName={organization.name}
            orgFriendlyName={organization.friendlyName}
            refetch={handleRefetch}
            updateGroupData={updateGroupData}
          />
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageGroups);
