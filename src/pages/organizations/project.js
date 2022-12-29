import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/MainLayout';
import ProjectAndOrganizationByID from 'lib/query/organizations/ProjectAndOrganizationByID';
import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import NavTabs from 'components/NavTabs';
import Highlighter from 'react-highlight-words';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import {
  withOrganizationRequired
} from 'lib/withDataRequired';
import { bp, color } from 'lib/variables';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import GroupBreadcrumb from 'components/Breadcrumbs/Organizations/Group';
import GroupMembers from 'components/Organizations/GroupMembers';
import Organization from 'components/Organizations/Organization';
import ProjectGroupMembers from 'components/Organizations/ProjectGroupMembers';
import ProjectNotifications from 'components/Organizations/ProjectNotifications';
import ProjectsBreadcrumb from 'components/Breadcrumbs/Organizations/Projects';
import OrgProjectBreadcrumb from 'components/Breadcrumbs/Organizations/Project';
import OrgNavTabs from 'components/Organizations/NavTabs';
import AddGroupToProject from 'components/Organizations/AddGroupToProject';
import AddNotificationToProject from 'components/Organizations/AddNotificationToProject';

/**
 * Displays a task page, given the openshift project and task ID.
 */

let options = [];

export const PageGroupProject = ({ router }) => (
  <>
    <Head>
      <title>{router.query.projectName} | Project</title>
    </Head>
    <Query
      query={ProjectAndOrganizationByID}
      variables={{ id: parseInt(router.query.organizationSlug, 10), project: router.query.projectName }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withOrganizationRequired
      )(({ data: { organization } }) => (
        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
            <ProjectsBreadcrumb organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
            <OrgProjectBreadcrumb projectSlug={router.query.projectName} organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
          </Breadcrumbs>
          <div className="content-wrapper">
          {organization.projects.map(project => (
          (project.name == router.query.projectName) && (
            <>
              <OrgNavTabs activeTab="projects" organization={organization} />
              <div className="projects-wrapper">
                <div className="details">
                  <div className="field-wrapper environmentType">
                    <AddGroupToProject
                      projectName={project.name} organizationId={organization.id} options={organization.groups.map(group => {return {label: group.name, value: group.name} })}
                    />
                  </div>
                  <div className="field-wrapper environmentType">
                    <AddNotificationToProject
                      projectName={project.name} organizationId={organization.id} options={organization}
                    />
                  </div>
                </div>
                <ProjectGroupMembers projectName={project.name} organizationId={organization.id} organizationName={organization.name} groups={project.groups || []} />
                <ProjectNotifications projectName={project.name} organizationId={organization.id} organizationName={organization.name} notifications={project.notifications} />
              </div>
            </>
          )))}
          </div>
          <style jsx>{`
            .project-details-sidebar {
              background-color: ${color.lightestGrey};
              border-right: 1px solid ${color.midGrey};
              padding: 32px;
              width: 100%;
              @media ${bp.xs_smallUp} {
                // padding: 24px calc((100vw / 16) * 1) 24px
                //   calc(((100vw / 16) * 1.5) + 28px);
              }
              @media ${bp.tabletUp} {
                min-width: 50%;
                // padding: 48px calc(((100vw / 16) * 1) + 28px);
                width: 50%;
              }
              @media ${bp.desktopUp} {
                min-width: 40%;
                // padding: 48px calc((100vw / 16) * 1);
                width: 40%;
              }
              @media ${bp.wideUp} {
                min-width: 25%;
                // min-width: calc((100vw / 16) * 4);
                width: 25%;
                // width: calc((100vw / 16) * 4);
              }
            }

            .details {
              width: 100%;
              @media ${bp.xs_smallUp} {
                display: flex;
                flex-wrap: wrap;
                min-width: 100%;
                width: 100%;
              }

              .field-wrapper {
                &::before {
                  left: calc(((-100vw / 16) * 1.5) - 28px);
                }
                margin: 0px;
                @media ${bp.xs_smallUp} {
                  min-width: 50%;
                  position: relative;
                  width: 50%;
                }
                @media ${bp.wideUp} {
                  min-width: 33.33%;
                  width: 33.33%;
                }
                @media ${bp.extraWideUp} {
                  min-width: 25%;
                  width: 25%;
                }

                &.environmentType {
                  &::before {
                    background-size: 20px 20px;
                  }
                }
              }
            }

            .rightside-button {
              display:flex; justify-content:flex-end; width:100%; padding:0;
            }

            .projects-wrapper {
              flex-grow: 1;
              padding: 40px calc((100vw / 16) * 1);
            }

            .content-wrapper {
              @media ${bp.tabletUp} {
                display: flex;
                justify-content: space-between;
              }
            }
          `}</style>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default withRouter(PageGroupProject);
