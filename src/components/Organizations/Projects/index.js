import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import DeleteConfirm from 'components/DeleteConfirm';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import gql from 'graphql-tag';

import NewProject from '../NewProject';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { TableActions } from '../SharedStyles';
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
            Groups: {project.groups.length}
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
            <>
              <UserAddOutlined className="add" onClick={() => {}} />
            </>

            <ProjectGroupLink
              projectGroupSlug={project.name}
              organizationSlug={organizationId}
              organizationName={organizationName}
              key={project.id}
            >
              <EditOutlined className="edit" />
            </ProjectGroupLink>

            <>
              <DeleteOutlined className="delete" onClick={() => {}} />

              {/* <Modal
                  isOpen={modalStates.deleteGroup.open && modalStates.deleteGroup.current.name === i.name}
                  onRequestClose={() => modalAction('close', 'deleteGroup')}
                >
                  <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
                  <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                    This action will delete this entry, you might not be able to get this back.
                  </p>

                  <ModalFooter>
                    <Mutation mutation={DELETE_GROUP}>
                      {(deleteGroup, { error, data }) => {
                        if (error) {
                          return <div>{error.message}</div>;
                        }
                        if (data) {
                          refetch().then(() => modalAction('close', 'deleteGroup'));
                          return <DeleteButton>Continue</DeleteButton>;
                        }
                        return (
                          <DeleteButton
                            onClick={() => {
                              deleteGroup({
                                variables: {
                                  groupName: modalStates.deleteGroup?.current?.name,
                                },
                              });
                            }}
                          >
                            Continue
                          </DeleteButton>
                        );
                      }}
                    </Mutation>
                    <CancelButton onClick={() => modalAction('close', 'deleteGroup')}>Cancel</CancelButton>
                  </ModalFooter>
                </Modal> */}
            </>
          </TableActions>
        );
      },
    },
  ];

  return (
    <StyledOrgProjects>
      <PaginatedTable limit={10} data={projects} columns={Columns} labelText="Projects" emptyText="No Projects" />

      <div className="data-table"></div>
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
