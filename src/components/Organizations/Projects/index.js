import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Skeleton from 'react-loading-skeleton';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useApolloClient } from '@apollo/client';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import ProjectLink from 'components/link/Project';
import gql from 'graphql-tag';

import { IconDashboard } from '../CustomIcons/OrganizationIcons';
import { DeleteButton } from '../Groups/Styles';
import NewProject from '../NewProject';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import {
  Footer,
  RemoveModalConfirmInput,
  RemoveModalHeader,
  RemoveModalParagraph,
  TableActions,
} from '../SharedStyles';
import { ProjectDashboard, StyledOrgProjects } from './Styles';

const DELETE_PROJECT = gql`
  mutation deleteProject($project: String!) {
    deleteProject(input: { project: $project })
  }
`;

const GET_SINGLE_PROJECT = gql`
  query getOrganization($project: String!) {
    project: orgProjectByName(name: $project) {
      id
      groupCount
    }
  }
`;

/**
 * The primary list of projects.
 */
const OrgProjects = ({
  projects = [],
  organizationId,
  organizationName,
  refresh,
  deployTargets,
  orgFriendlyName,
  updateProjectData,
}) => {
  const [modalState, setModalState] = useState({
    open: false,
    current: null,
    confirmValue: '',
  });

  const client = useApolloClient();

  const handleDataChange = async data => {
    const projectNames = data.map(d => d.name);

    const promises = projectNames.map(name => {
      return client.query({
        query: GET_SINGLE_PROJECT,
        variables: { project: name, id: organizationId },
        fetchPolicy: 'no-cache',
      });
    });

    const projectsData = await Promise.all(promises);
    const projectsWithGroupCount = projectsData.map(({ data }) => data.project);

    updateProjectData(projectsWithGroupCount);
  };

  const Columns = [
    {
      width: '30%',
      key: 'name',
      render: project => {
        return (
          <>
            <ProjectGroupLink
              projectGroupSlug={project.name}
              organizationSlug={organizationName}
              organizationId={organizationId}
              orgFriendlyName={orgFriendlyName}
              key={project.id}
            >
              {project.name}
            </ProjectGroupLink>
          </>
        );
      },
    },
    {
      width: '30%',
      key: 'groups',
      render: project => {
        return (
          <div className="groups" style={{ fontSize: '13px' }}>
            Groups: {project?.groupCount !== undefined ? project?.groupCount : <Skeleton height={17} width={20} />}
          </div>
        );
      },
    },
    {
      width: '40%',
      key: 'actions',
      render: function (project) {
        return (
          <TableActions style={{ marginLeft: 'auto', gap: '1rem' }}>
            <ProjectLink projectSlug={project.name} key={project.id} openInTab>
              <Tooltip overlayClassName="orgTooltip" title="View Dashboard" placement="bottom">
                <ProjectDashboard $inlineLink>
                  <IconDashboard />
                </ProjectDashboard>
              </Tooltip>
            </ProjectLink>

            <Tooltip overlayClassName="orgTooltip" title="Edit" placement="bottom">
              <>
                <ProjectGroupLink
                  className="link"
                  projectGroupSlug={project.name}
                  organizationSlug={organizationName}
                  organizationId={organizationId}
                  orgFriendlyName={orgFriendlyName}
                  key={project.id}
                >
                  <EditOutlined className="edit" />
                </ProjectGroupLink>
              </>
            </Tooltip>
            <>
              <Tooltip overlayClassName="orgTooltip" title="Delete" placement="bottom">
                <DeleteOutlined
                  className="delete"
                  data-cy="deleteProject"
                  onClick={() => {
                    setModalState({ open: true, current: project.name });
                  }}
                />
              </Tooltip>

              <Modal
                isOpen={modalState.open && modalState.current === project.name}
                onRequestClose={() => setModalState({ open: false, current: null })}
              >
                <RemoveModalHeader>Are you sure?</RemoveModalHeader>
                <RemoveModalParagraph>
                  This action will delete project <span className="highlight">{project.name}</span> from Lagoon and the
                  organization.
                </RemoveModalParagraph>

                <RemoveModalParagraph>Type the name of the project to confirm.</RemoveModalParagraph>

                <RemoveModalConfirmInput
                  type="text"
                  data-cy="deleteProjectConfirm"
                  onChange={e => {
                    setModalState({ ...modalState, confirmValue: e.target.value });
                  }}
                />

                <Footer>
                  <Mutation mutation={DELETE_PROJECT} onError={e => console.error(e)}>
                    {(deleteProject, { called, error, data }) => {
                      if (error) {
                        return <div className="error">{error.message}</div>;
                      }
                      if (data) {
                        refresh().then(() => setModalState({ open: false, current: null }));
                        return <DeleteButton>Continue</DeleteButton>;
                      }

                      return (
                        <Button
                          testId="deleteConfirm"
                          variant="primary"
                          disabled={modalState.confirmValue !== modalState.current || called}
                          loading={called}
                          action={() => {
                            deleteProject({
                              variables: {
                                project: modalState.current,
                              },
                            });
                          }}
                        >
                          Continue
                        </Button>
                      );
                    }}
                  </Mutation>
                  <Button variant="ghost" action={() => setModalState({ open: false, current: null })}>
                    Cancel
                  </Button>
                </Footer>
              </Modal>
            </>
          </TableActions>
        );
      },
    },
  ];

  return (
    <StyledOrgProjects>
      <PaginatedTable
        limit={10}
        data={projects}
        columns={Columns}
        numericSortOptions={{ key: 'groupCount', displayName: 'Groups' }}
        withSorter
        labelText="Projects"
        emptyText="No Projects"
        disableShowAllResults
        onVisibleDataChange={handleDataChange}
      />
      <NewProject
        organizationId={organizationId}
        options={deployTargets.map(deploytarget => {
          return { label: deploytarget.name, value: deploytarget.id };
        })}
        refresh={refresh}
      />
    </StyledOrgProjects>
  );
};

export default OrgProjects;
