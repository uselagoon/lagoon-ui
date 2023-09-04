import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { EditOutlined, EnvironmentOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import OrgManageLink from 'components/link/Organizations/Manage';
import gql from 'graphql-tag';

import OrgHeader from '../Orgheader';
import { Footer, ModalChildren, Tag } from '../SharedStyles';
import { LinkBtn, StyledOrganization, StyledOverview } from './Styles';

const UPDATE_ORGANIZATION_FRIENDLY_NAME = gql`
  mutation updateOrganizationFriendlyName($id: Int!, $friendlyName: String!) {
    updateOrganization(input: { id: $id, patch: { friendlyName: $friendlyName } }) {
      id
      name
      friendlyName
    }
  }
`;

const UPDATE_ORGANIZATION_DESCRIPTION = gql`
  mutation updateOrganizationFriendlyName($id: Int!, $description: String!) {
    updateOrganization(input: { id: $id, patch: { description: $description } }) {
      id
      name
      description
    }
  }
`;

/**
 * Displays the organization information.
 */
const Organization = ({ organization, refetch }) => {
  // this is done on the API side when creating groups against the organization as project-default-groups are not counted towards the quota
  // using the same count here to show the quota in the ui
  let groupCount = 0;
  for (const pGroup in organization.groups) {
    // project-default-groups don't count towards group quotas
    if (organization.groups[pGroup].type != 'project-default-group') {
      groupCount++;
    }
  }

  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [friendlyName, setFriendlyName] = useState('');

  const [descModalOpen, setDescModalOpen] = useState(false);
  const [description, setDescription] = useState('');

  const quotaDisplay = (quota, quotaNumber, quotaLimit) => {
    const pluralName = quota + 's';
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    const link = {
      urlObject: {
        pathname: `/organizations/${pluralName}`,
        query: { organizationSlug: organization.id },
      },
      asPath: `/organizations/${organization.id}/${pluralName}`,
    };

    return (
      <div className="quotaField">
        <span>{pluralName.toUpperCase()}</span>
        <span className="quota">
          {capitalize(quota)} quota: {quotaNumber} of {quotaLimit}
        </span>

        <Link href={link.urlObject} as={link.asPath}>
          <LinkBtn>
            <EyeOutlined className="icon" /> {capitalize(pluralName)}
          </LinkBtn>
        </Link>
      </div>
    );
  };

  const modalAction = (action, modalName) => {
    const modalAction = !(action === 'close');
    return modalName === 'name' ? () => setNameModalOpen(modalAction) : () => setDescModalOpen(modalAction);
  };

  const renderEditBtn = type => <EditOutlined style={{ color: '#4578E6' }} onClick={modalAction('open', type)} />;

  return (
    <StyledOrganization>
      <OrgHeader headerText="overview" />
      <StyledOverview>
        <span className="orgname">
          {organization.friendlyName || organization.name} {renderEditBtn('name')}
          <Modal
            style={{
              content: {
                width: '50%',
              },
            }}
            onRequestClose={modalAction('close', 'name')}
            isOpen={nameModalOpen}
          >
            <ModalChildren>
              <h4>Change Organization name</h4>
              <div className="form-box">
                <label>
                  Organization name: <span style={{ color: '#E30000' }}>*</span>
                  <input
                    className="inputName"
                    type="text"
                    placeholder="Existing organization name"
                    value={friendlyName}
                    onChange={e => setFriendlyName(e.target.value)}
                  />
                </label>
              </div>

              <Footer>
                <Mutation mutation={UPDATE_ORGANIZATION_FRIENDLY_NAME} onError={e => console.error(e)}>
                  {(updateOrgFriendlyName, { error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(() => {
                        modalAction('close', 'name')();
                        setFriendlyName('');
                      });
                    }
                    return (
                      <Button
                        variant="primary"
                        action={() => {
                          friendlyName &&
                            updateOrgFriendlyName({
                              variables: {
                                id: organization.id,
                                friendlyName,
                              },
                            });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={modalAction('close', 'name')}>
                  Cancel
                </Button>
              </Footer>
            </ModalChildren>
          </Modal>
        </span>

        <div className="description">
          <span className="title">Description</span> {!organization.description && renderEditBtn('description')}
          <p>
            {organization.description} {organization.description && renderEditBtn('description')}
          </p>
          <Modal
            isOpen={descModalOpen}
            onRequestClose={modalAction('close', 'description')}
            style={{
              content: {
                width: '50%',
              },
            }}
          >
            <ModalChildren>
              <h4>Change Organization description</h4>
              <div className="form-box">
                <label>
                  Organization description: <span style={{ color: '#E30000' }}>*</span>
                  <input
                    className="inputName"
                    type="text"
                    placeholder="Org description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </label>
              </div>
              <Footer>
                <Mutation mutation={UPDATE_ORGANIZATION_DESCRIPTION} onError={e => console.error(e)}>
                  {(updateOrgDescription, { error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(() => {
                        modalAction('close', 'description')();
                        setDescription('');
                      });
                    }
                    return (
                      <Button
                        variant="primary"
                        action={() => {
                          description &&
                            updateOrgDescription({
                              variables: {
                                id: organization.id,
                                description,
                              },
                            });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={modalAction('close', 'description')}>
                  Cancel
                </Button>
              </Footer>
            </ModalChildren>
          </Modal>
        </div>
        <div className="info">
          <div className="quotas">
            {quotaDisplay('group', groupCount, organization.quotaGroup)}
            {quotaDisplay('project', organization.projects.length, organization.quotaProject)}
            {quotaDisplay(
              'notification',
              organization.slacks.length +
                organization.rocketchats.length +
                organization.teams.length +
                organization.emails.length +
                organization.webhook.length,
              organization.quotaNotification
            )}
          </div>

          <div className="targetwrapper">
            <div className="targets">
              <span>Available Deployments</span>
              {organization.deployTargets.map(deploytarget => (
                <div key={deploytarget.id} className="target">
                  <EnvironmentOutlined className="targetIcon" />
                  {deploytarget.name}
                </div>
              ))}
            </div>

            <div className="users">
              <span>Administrators</span>
              {organization.owners.slice(0, 10).map(owner => (
                <div key={owner.email} className="user">
                  <div className="person">
                    <UserOutlined className="userIcon" />
                    <div className="email">{owner.email} </div>

                    {owner.owner ? (
                      <Tag style={{ display: 'inline-block', marginLeft: '1.5rem' }} background="#47D3FF">
                        ORG OWNER
                      </Tag>
                    ) : (
                      <Tag style={{ display: 'inline-block', marginLeft: '1.5rem' }} background="#FF4747">
                        ORG VIEWER
                      </Tag>
                    )}
                  </div>
                </div>
              ))}
              <OrgManageLink organizationSlug={organization.id} organizationName={organization.name}>
                View more ...
              </OrgManageLink>
            </div>
          </div>
        </div>
      </StyledOverview>
    </StyledOrganization>
  );
};

export default Organization;
