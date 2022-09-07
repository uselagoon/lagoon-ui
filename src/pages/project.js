import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/MainLayout';
import ProjectByNameQuery from 'lib/query/ProjectByName';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import ProjectDetailsSidebar from 'components/ProjectDetailsSidebar';
import LeftNavTabs from 'components/LeftNavTabs';
import Environments from 'components/Environments';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withProjectRequired } from 'lib/withDataRequired';
import { bp, color } from 'lib/variables';

/**
 * Displays a project page, given the project name.
 */
export const PageProject = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.projectName} | Project`}</title>
    </Head>
    <Query
      query={ProjectByNameQuery}
      variables={{ name: router.query.projectName }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withProjectRequired
      )(({ data: { project } }) => {
        // Sort alphabetically by environmentType and then deployType
        const environments = R.sortWith(
          [
            R.descend(R.prop('environmentType')),
            R.ascend(R.prop('deployType'))
          ],
          project.environments
        );

        return (
          <MainLayout>
            <Breadcrumbs>
              <ProjectBreadcrumb projectSlug={project.name} />
            </Breadcrumbs>
            <div className="content-wrapper">
              <LeftNavTabs activeTab="" environment={[]} />
              <div className="content">
                <div className="project-details-header">
                  <ProjectDetailsSidebar project={project} />
                </div>
                <div className="environments-wrapper">
                  <h3>Environments</h3>
                  {!environments.length && <p>No Environments</p>}
                  <Environments environments={environments} project={project} />
                </div>
              </div>
            </div>
            <style jsx>{`
              .content-wrapper {
                @media ${bp.tabletUp} {
                  display: flex;
                  justify-content: space-between;
                }
              }

              .content {
                display: flex;
                min-width: 80%;
                flex-direction: column;
              }

              .project-details-header {
                background-color: ${color.lightestGrey};
                border-right: 1px solid ${color.midGrey};
                padding: 32px calc((100vw / 16) * 1);
                width: 100%;
                @media ${bp.xs_smallUp} {
                  padding: 24px calc((100vw / 16) * 1) 24px
                    calc(((100vw / 16) * 1.5) + 28px);
                }
                @media ${bp.tabletUp} {
                  padding: 48px calc(((100vw / 16) * 1) + 28px);
                }
                @media ${bp.desktopUp} {
                  padding: 48px calc((100vw / 16) * 1);
                }
              }

              .environments-wrapper {
                flex-grow: 1;
                padding: 40px calc((100vw / 16) * 1);
              }
            `}</style>
          </MainLayout>
        );
      })}
    </Query>
  </>
);

export default withRouter(PageProject);
