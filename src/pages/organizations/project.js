import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgProjectBreadcrumb from 'components/Breadcrumbs/Organizations/Project';
import ProjectsBreadcrumb from 'components/Breadcrumbs/Organizations/Projects';
import AddGroupToProject from 'components/Organizations/AddGroupToProject';
import AddNotificationToProject from 'components/Organizations/AddNotificationToProject';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import ProjectGroupMembers from 'components/Organizations/ProjectGroupMembers';
import ProjectGroupSkeleton from 'components/Organizations/ProjectGroupMembers/ProjectGroupSkeleton';
import ProjectNotifications from 'components/Organizations/ProjectNotifications';
import ProjectNotificationsSkeleton from 'components/Organizations/ProjectNotifications/ProjectNotificationsSkeleton';
import { OrgProjectWrapper } from 'components/Organizations/Projects/Styles';
import MainLayout from 'layouts/MainLayout';
import ProjectAndOrganizationByID from 'lib/query/organizations/ProjectAndOrganizationByID';

import { OrganizationsWrapper } from '../../components/Organizations/SharedStyles';
import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a task page, given the openshift project and task ID.
 */

export const PageGroupProject = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(ProjectAndOrganizationByID, {
    variables: { id: parseInt(router.query.organizationSlug, 10), project: router.query.projectName },
  });

  const handleRefetch = async () =>
    await refetch({ id: parseInt(router.query.organizationSlug, 10), project: router.query.projectName });

  if (loading) {
    return (
      <>
        <Head>
          <title>{router.query.projectName} | Project</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb organizationSlug={router.query.organizationSlug} loading />
            <ProjectsBreadcrumb organizationSlug={router.query.organizationSlug} />
            <OrgProjectBreadcrumb
              projectSlug={router.query.projectName}
              organizationSlug={router.query.organizationSlug}
            />
          </Breadcrumbs>
          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="projects" />

            <OrgProjectWrapper>
              <div className="details">
                <div className="field-wrapper environmentType">
                  <AddGroupToProject refresh={handleRefetch} projectName="" organizationId={null} options={[]} />
                </div>
                <div className="field-wrapper environmentType">
                  <AddNotificationToProject refresh={handleRefetch} projectName="" organizationId={null} options={[]} />
                </div>
              </div>
              <ProjectGroupSkeleton />
              <ProjectNotificationsSkeleton />
            </OrgProjectWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const { organization } = data;

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
            organizationSlug={router.query.organizationSlug}
            organizationName={organization.name}
          />
          <ProjectsBreadcrumb organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
          <OrgProjectBreadcrumb
            projectSlug={router.query.projectName}
            organizationSlug={router.query.organizationSlug}
            organizationName={organization.name}
          />
        </Breadcrumbs>

        <OrganizationsWrapper>
          {organization.projects.map(
            project =>
              project.name == router.query.projectName && (
                <>
                  <OrgNavTabs activeTab="projects" organization={organization} />

                  <OrgProjectWrapper>
                    <div className="details">
                      <div className="field-wrapper environmentType">
                        <AddGroupToProject
                          projectName={project.name}
                          organizationId={organization.id}
                          options={organization.groups.map(group => {
                            return { label: group.name, value: group.name };
                          })}
                          refresh={handleRefetch}
                        />
                      </div>
                      <div className="field-wrapper environmentType">
                        <AddNotificationToProject
                          projectName={project.name}
                          organizationId={organization.id}
                          options={organization}
                          refresh={handleRefetch}
                        />
                      </div>
                    </div>
                    <ProjectGroupMembers
                      refresh={handleRefetch}
                      projectName={project.name}
                      organizationId={organization.id}
                      organizationName={organization.name}
                      groups={project.groups || []}
                    />
                    <ProjectNotifications
                      refresh={handleRefetch}
                      projectName={project.name}
                      organizationId={organization.id}
                      organizationName={organization.name}
                      notifications={project.notifications}
                    />
                  </OrgProjectWrapper>
                </>
              )
          )}
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageGroupProject);
