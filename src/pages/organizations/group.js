import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useLazyQuery, useQuery } from '@apollo/client';
import Breadcrumbs from 'components/Breadcrumbs';
import GroupBreadcrumb from 'components/Breadcrumbs/Organizations/Group';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import GroupMembers from 'components/Organizations/GroupMembers';
import GroupMembersSkeleton from 'components/Organizations/GroupMembers/GroupMembersSkeleton';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import { GroupPageWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import GroupByNameAndOrganization from 'lib/query/organizations/GroupByNameAndOrganization';
import OrganizationIdByName from 'lib/query/organizations/OrganizationIdByName';

import GroupNotFound from '../../components/errors/GroupNotFound';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a task page, given the openshift project and task ID.
 */

export const PageGroup = ({ router }) => {
  const {
    data: orgData,
    error: orgErr,
    loading: orgLoading,
  } = useQuery(OrganizationIdByName, {
    variables: { name: router.query.organizationSlug },
    onCompleted: ({ organization }) => {
      if (organization) {
        getGroupByNameAndOrg({
          variables: { name: router.query.groupName, organization: orgData.organization.id },
        });
      }
    },
  });

  const [getGroupByNameAndOrg, { data, error, loading, refetch }] = useLazyQuery(GroupByNameAndOrganization, {});

  const handleRefetch = async () =>
    await refetch({ name: router.query.groupName, organization: orgData.organization.id });

  if (loading || orgLoading || !data) {
    return (
      <>
        <Head>
          <title>{`${router.query.groupName} | Group`}</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              orgFriendlyName={router.query.orgFriendlyName}
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
            <GroupBreadcrumb organizationSlug={router.query.organizationSlug} organizationId={null} loading />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="groups" />

            <GroupPageWrapper>
              <GroupMembersSkeleton />
            </GroupPageWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error || orgErr) {
    return <QueryError error={error} />;
  }

  const { organization, group } = data;

  if (!organization) {
    return <OrganizationNotFound variables={{ name: router.query.organizationSlug }} />;
  }

  if (!group) {
    return <GroupNotFound variables={{ name: router.query.organizationSlug }} />;
  }
  return (
    <>
      <Head>
        <title>{`${router.query.groupName} | Group`}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb
            orgFriendlyName={organization.friendlyName}
            organizationSlug={router.query.organizationSlug}
            organizationId={organization.id}
          />
          <GroupBreadcrumb
            groupSlug={group.name}
            organizationSlug={router.query.organizationSlug}
            organizationId={organization.id}
          />
        </Breadcrumbs>

        <OrganizationsWrapper>
          <OrgNavTabs activeTab="groups" organization={organization} />

          <GroupPageWrapper>
            <GroupMembers
              organizationId={organization.id}
              organizationName={organization.name}
              orgFriendlyName={organization.friendlyName}
              orgProjects={organization.projects || []}
              projects={group.projects || []}
              members={group.members || []}
              groupName={group.name}
              projectDefaultGroup={(group.type.includes('project-default-group') && 'project') || 'user'}
              refetch={handleRefetch}
            />
          </GroupPageWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageGroup);
