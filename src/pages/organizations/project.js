import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { ExportOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks';
import { Tooltip } from 'antd';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgProjectBreadcrumb from 'components/Breadcrumbs/Organizations/Project';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import OrgHeader from 'components/Organizations/Orgheader';
import ProjectGroupMembers from 'components/Organizations/ProjectGroupMembers';
import ProjectGroupSkeleton from 'components/Organizations/ProjectGroupMembers/ProjectGroupSkeleton';
import ProjectNotifications from 'components/Organizations/ProjectNotifications';
import ProjectNotificationsSkeleton from 'components/Organizations/ProjectNotifications/ProjectNotificationsSkeleton';
import { OrgProjectWrapper, ProjectDashboard } from 'components/Organizations/Projects/Styles';
import ProjectLink from 'components/link/Project';
import MainLayout from 'layouts/MainLayout';
import ProjectAndOrganizationByID from 'lib/query/organizations/ProjectAndOrganizationByID';
import ProjectAndOrganizationByName from 'lib/query/organizations/ProjectAndOrganizationByName';

import { OrganizationsWrapper, TableWrapper } from '../../components/Organizations/SharedStyles';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a task page, given the openshift project and task ID.
 */

export const PageGroupProject = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(ProjectAndOrganizationByName, {
    variables: { name: router.query.organizationSlug, project: router.query.projectName },
  });

  const handleRefetch = async () =>
    await refetch({ name: router.query.organizationSlug, project: router.query.projectName });

  if (loading) {
    return (
      <>
        <Head>
          <title>{router.query.projectName} | Project</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              orgFriendlyName={router.query.orgFriendlyName}
              organizationId={router.query.organizationId}
              organizationSlug={router.query.organizationSlug}
              loading
            />
            <OrgProjectBreadcrumb
              projectSlug={router.query.projectName}
              organizationSlug={router.query.organizationSlug}
            />
          </Breadcrumbs>
          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="projects" />

            <OrgProjectWrapper>
              <OrgHeader headerText="Project" />
              <TableWrapper>
                <h3>{router.query.projectName}</h3>
                <ProjectGroupSkeleton />
                <ProjectNotificationsSkeleton />
              </TableWrapper>
            </OrgProjectWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const { organization, project } = data;

  if (!organization) {
    return <OrganizationNotFound variables={{ name: router.query.organizationSlug }} />;
  }

  return (
    <>
      <Head>
        <title>{router.query.projectName} | Project</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb
            orgFriendlyName={organization.friendlyName}
            organizationSlug={router.query.organizationSlug}
            organizationId={organization.id}
          />
          <OrgProjectBreadcrumb
            projectSlug={router.query.projectName}
            organizationSlug={router.query.organizationSlug}
            organization={organization.id}
          />
        </Breadcrumbs>

        <OrganizationsWrapper>
          <OrgNavTabs activeTab="projects" organization={organization} />
          <OrgProjectWrapper>
            <OrgHeader headerText="Project" />
            <TableWrapper>
              <h3>
                {project.name}
                <ProjectLink projectSlug={project.name} key={project.id} openInTab>
                  <Tooltip overlayClassName="orgTooltip" title="View project in project overview" placement="bottom">
                    <ProjectDashboard>
                      View in Dashboard <ExportOutlined />
                    </ProjectDashboard>
                  </Tooltip>
                </ProjectLink>
              </h3>
              <ProjectGroupMembers
                refresh={handleRefetch}
                projectName={project.name}
                organizationId={organization.id}
                organizationSlug={organization.name}
                orgFriendlyName={organization.friendlyName}
                groups={project.groups || []}
                orgGroups={organization.groups}
              />
              <ProjectNotifications
                refresh={handleRefetch}
                projectName={project.name}
                organizationId={organization.id}
                organizationSlug={organization.name}
                notifications={project.notifications}
                organization={organization}
              />
            </TableWrapper>
          </OrgProjectWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageGroupProject);
