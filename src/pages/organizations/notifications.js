import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import getConfig from 'next/config';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/MainLayout';
import OrganizationNotificationsByIDQuery from 'lib/query/organizations/OrganizationNotificationsByID';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import DeployLatest from 'components/DeployLatest';
import Projects from 'components/Projects';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import {  withOrganizationRequired } from 'lib/withDataRequired';
import { bp } from 'lib/variables';
import OrgNotifications from 'components/Organizations/Notifications';
import AddSlackNotification from 'components/Organizations/AddNotifications/Slack';
import AddRocketChatNotification from 'components/Organizations/AddNotifications/RocketChat';
import AddEmailNotification from 'components/Organizations/AddNotifications/Email';
import AddMicrosoftTeamsNotification from 'components/Organizations/AddNotifications/MicrosoftTeams';
import AddWebhookNotification from 'components/Organizations/AddNotifications/Webhook';

/**
 * Displays the projects page, given the organization id
 */
export const PageOrgNotifications = ({ router }) => (
  <>
  <Query
    query={OrganizationNotificationsByIDQuery}
    variables={{ id: parseInt(router.query.organizationSlug, 10) }}
  >
    {R.compose(
      withQueryLoading,
      withQueryError,
      withOrganizationRequired
    )(({ data: { organization } }) => {
      return (
        <>
          <Head>
            <title>{`${organization.name} | Organization`}</title>
          </Head>
          <MainLayout>
            <Breadcrumbs>
              <OrganizationBreadcrumb organizationSlug={organization.id} organizationName={organization.name} />
            </Breadcrumbs>
            <div className="content-wrapper">
              <OrgNavTabs activeTab="notifications" organization={organization} />
              <div className="notifications-wrapper">
                <div className="details">
                  <div className="field-wrapper environmentType">
                    <AddSlackNotification organizationId={organization.id}
                    />
                  </div>
                  <div className="field-wrapper environmentType">
                    <AddRocketChatNotification organizationId={organization.id}
                    />
                  </div>
                  <div className="field-wrapper environmentType">
                    <AddEmailNotification organizationId={organization.id}
                    />
                  </div>
                  <div className="field-wrapper environmentType">
                    <AddMicrosoftTeamsNotification organizationId={organization.id}
                    />
                  </div>
                  <div className="field-wrapper environmentType">
                    <AddWebhookNotification organizationId={organization.id}
                    />
                  </div>
                </div>
                <OrgNotifications
                slacks={organization.slacks}
                emails={organization.emails}
                rocketchats={organization.rocketchats}
                teams={organization.teams}
                webhooks={organization.webhook}
                organizationId={organization.id}
                organizationName={organization.name} />
              </div>
            </div>
            <style jsx>{`
              .content-wrapper {
                @media ${bp.tabletUp} {
                  display: flex;
                  justify-content: space-between;
                }
              }
              .notifications-wrapper {
                flex-grow: 1;
                padding: 40px calc((100vw / 16) * 1);
              }
              .content {
                padding: 32px calc((100vw / 16) * 1);
                width: 100%;
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
                    min-width: 20%;
                    width: 20%;
                  }
  
                  &.environmentType {
                    &::before {
                      background-size: 20px 20px;
                    }
                  }
                }
              }
            `}</style>
          </MainLayout>
        </>
      );
      })}
    </Query>
  </>
);

export default withRouter(PageOrgNotifications);
