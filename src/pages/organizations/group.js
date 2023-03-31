import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import MainLayout from 'layouts/MainLayout';
import GroupByNameAndOrganization from 'lib/query/organizations/GroupByNameAndOrganization';
import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import NavTabs from 'components/NavTabs';
import Highlighter from 'react-highlight-words';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import {
  withGroupRequired
} from 'lib/withDataRequired';
import { bp, color } from 'lib/variables';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import GroupsBreadcrumb from 'components/Breadcrumbs/Organizations/Groups';
import GroupBreadcrumb from 'components/Breadcrumbs/Organizations/Group';
import GroupMembers from 'components/Organizations/GroupMembers';
import DeleteConfirm from 'components/DeleteConfirm';
import Router from 'next/router';
import OrgNavTabs from 'components/Organizations/NavTabs';
import AddUserToGroup from '../../components/Organizations/AddUserToGroup';

/**
 * Displays a task page, given the openshift project and task ID.
 */

let options = [];

export const PageGroup = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.groupName} | Group`}</title>
    </Head>
    <Query
      query={GroupByNameAndOrganization}
      variables={{ name: router.query.groupName, organization: parseInt(router.query.organizationSlug, 10) }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withGroupRequired
      )(({ data: { group, organization } }) => (
        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
            <GroupsBreadcrumb organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
            <GroupBreadcrumb groupSlug={group.name} organizationSlug={router.query.organizationSlug} organizationName={organization.name} />
          </Breadcrumbs>
          <div className="content-wrapper">
              <OrgNavTabs activeTab="groups" organization={organization} />
              <div className="groups-wrapper">
                <div className="details">
                  <div className="field-wrapper environmentType">
                    <AddUserToGroup
                      group={group} organizationId={organization.id}
                    />
                  </div>
                </div>
                <GroupMembers members={group.members || []} groupName={group.name} projectDefaultGroup={group.type.includes("project-default-group") && "project" || "user"} />
              </div>
          </div>
          <style jsx>{`
            .project-details-sidebar {
              background-color: ${color.lightestGrey};
              border-right: 1px solid ${color.midGrey};
              padding: 32px;
              width: 100%;
              @media ${bp.tabletUp}
              {
                min-width: 50%;
                width: 50%;
              }
              @media ${bp.desktopUp}
              {
                min-width: 40%;
                width: 40%;
              }
              @media ${bp.wideUp}
              {
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
              display:flex;
              justify-content:flex-end;
              width:100%;
              padding:0;
            }
            .groups-wrapper {
              flex-grow: 1;
              padding: 40px calc((100vw / 16) * 1);
            }
            .content-wrapper {
              @media ${bp.tabletUp}
              {
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

export default withRouter(PageGroup);
