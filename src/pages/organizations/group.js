import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import GroupBreadcrumb from 'components/Breadcrumbs/Organizations/Group';
import GroupsBreadcrumb from 'components/Breadcrumbs/Organizations/Groups';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import GroupMembers from 'components/Organizations/GroupMembers';
import GroupMembersSkeleton from 'components/Organizations/GroupMembers/GroupMembersSkeleton';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import { GroupPageWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import GroupByNameAndOrganization from 'lib/query/organizations/GroupByNameAndOrganization';

import AddUserToGroup from '../../components/Organizations/AddUserToGroup';
import GroupNotFound from '../../components/errors/GroupNotFound';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a task page, given the openshift project and task ID.
 */

export const PageGroup = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(GroupByNameAndOrganization, {
    variables: { name: router.query.groupName, organization: parseInt(router.query.organizationSlug, 10) },
  });

  const handleRefetch = async () =>
    await refetch({ name: router.query.groupName, organization: parseInt(router.query.organizationSlug, 10) });

  if (loading) {
    return (
      <>
        <Head>
          <title>{`${router.query.groupName} | Group`}</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationName={router.query.organizationName || ''}
            />
            <GroupBreadcrumb organizationSlug={router.query.organizationSlug} organizationName="" loading />
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

  if (error) {
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
            organizationSlug={router.query.organizationSlug}
            organizationName={organization.name}
          />
          <GroupBreadcrumb
            groupSlug={group.name}
            organizationSlug={router.query.organizationSlug}
            organizationName={organization.name}
          />
        </Breadcrumbs>

        <OrganizationsWrapper>
          <OrgNavTabs activeTab="groups" organization={organization} />

          <GroupPageWrapper>
            <GroupMembers
              organizationId={organization.id}
              organizationName={organization.name}
              projects={organization.projects || []}
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
