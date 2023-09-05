import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import gql from 'graphql-tag';

import { DeleteButton } from '../Groups/Styles';
import NewProject from '../NewProject';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, RemoveModalHeader, RemoveModalParagraph, TableActions } from '../SharedStyles';
import { StyledOrgProjects } from './Styles';

const DELETE_PROJECT = gql`
  mutation deleteProject($project: String!) {
    deleteProject(input: { project: $project })
  }
`;

/**
 * The primary list of projects.
 */
const OrgProjects = ({ projects = [], organizationId, organizationName, refresh, deployTargets }) => {
  const [modalState, setModalState] = useState({
    open: false,
    current: null,
  });

  const Columns = [
    {
      width: '30%',
      key: 'name',
      render: project => {
        return (
          <ProjectGroupLink
            projectGroupSlug={project.name}
            organizationSlug={organizationId}
            organizationName={organizationName}
            key={project.id}
          >
            {project.name}
          </ProjectGroupLink>
        );
      },
    },
    {
      width: '30%',
      key: 'groups',
      render: project => {
        return (
          <div className="groups" style={{ fontSize: '13px' }}>
            Groups: {project.groupCount}
          </div>
        );
      },
    },
    {
      width: '40%',
      key: 'actions',
      render: function (project) {
        return (
          <TableActions style={{ marginLeft: 'auto' }}>
            <ProjectGroupLink
              className="link"
              projectGroupSlug={project.name}
              organizationSlug={organizationId}
              organizationName={organizationName}
              key={project.id}
            >
              <EditOutlined className="edit" />
            </ProjectGroupLink>

            <>
              <DeleteOutlined
                className="delete"
                onClick={() => {
                  setModalState({ open: true, current: project.name });
                }}
              />

              <Modal
                isOpen={modalState.open && modalState.current === project.name}
                onRequestClose={() => setModalState({ open: false, current: null })}
              >
                <RemoveModalHeader>Are you sure?</RemoveModalHeader>
                <RemoveModalParagraph>
                  This action will delete this entry, you might not be able to get this back.
                </RemoveModalParagraph>

                <Footer>
                  <Mutation mutation={DELETE_PROJECT} onError={e => console.error(e)}>
                    {(deleteProject, { error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      }
                      if (data) {
                        refresh().then(() => setModalState({ open: false, current: null }));
                        return <DeleteButton>Continue</DeleteButton>;
                      }

                      return (
                        <Button
                          variant="primary"
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
        numericSortKey="groups"
        withSorter
        labelText="Projects"
        emptyText="No Projects"
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
