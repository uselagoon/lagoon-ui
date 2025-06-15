import React, { useEffect, useState } from 'react';

import Head from 'next/head';

import { useMutation, useQuery } from '@apollo/react-hooks';
import Button from 'components/Button';
import { EmailForm } from 'components/SshKeys/StyledKeys';
import gql from 'graphql-tag';
import MainLayout from 'layouts/MainLayout';
import Me from 'lib/query/Me';

import SshKeys from '../../components/SshKeys';
import AddSshKey from '../../components/SshKeys/AddSshKey';
import QueryError from '../../components/errors/QueryError';
import { CommonWrapper } from '../../styles/commonPageStyles';

const UPDATE_USER = gql`
mutation updateUser(
  $email: String!,
  $sshKeyChanges: Boolean!,
  $groupRoleChanges: Boolean!,
  $organizationRoleChanges: Boolean!
) {
  updateUser(
    input: {
      user: { email: $email },
      patch: {
        emailNotifications: {
          sshKeyChanges: $sshKeyChanges,
          groupRoleChanges: $groupRoleChanges,
          organizationRoleChanges: $organizationRoleChanges
        }
      }
    }
  ) {
    email
    emailNotifications {
      sshKeyChanges
      groupRoleChanges
      organizationRoleChanges
    }
  }
}
`;

/**
 * Displays the user settings page.
 */
const SettingsPage = () => {
  const queryVars = {
    displayName: 'Me',
    fetchPolicy: 'cache-and-network',
  };
  const { data, loading, error, refetch } = useQuery(Me, queryVars);

  const [emailNotifications, setEmailNotifications] = useState({
  sshKeyChanges: data?.me?.emailNotifications?.sshKeyChanges ?? false,
  groupRoleChanges: data?.me?.emailNotifications?.groupRoleChanges ?? false,
  organizationRoleChanges: data?.me?.emailNotifications?.organizationRoleChanges ?? false,
});

  const [updateUser, { loading: updatingOptIn, error: updateOptInError }] = useMutation(UPDATE_USER);

  // Sync state when data loads
  useEffect(() => {
  if (data?.me?.emailNotifications) {
    setEmailNotifications({
      sshKeyChanges: data.me.emailNotifications.sshKeyChanges,
      groupRoleChanges: data.me.emailNotifications.groupRoleChanges,
      organizationRoleChanges: data.me.emailNotifications.organizationRoleChanges,
    });
  }
}, [data?.me?.emailNotifications]);

  const handleRefetch = async () => await refetch(queryVars);

const handleUpdateUser = async e => {
  e.preventDefault();
  await updateUser({
    variables: {
      email: data?.me?.email,
      sshKeyChanges: emailNotifications.sshKeyChanges,
      groupRoleChanges: emailNotifications.groupRoleChanges,
      organizationRoleChanges: emailNotifications.organizationRoleChanges,
    },
  });
  handleRefetch();
};

  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2>Email Preferences</h2>
          <div className="content" style={{ minHeight: 0 }}>
            <EmailForm onSubmit={handleUpdateUser}>
              <label>
                <input
                  type="checkbox"
                  checked={emailNotifications.sshKeyChanges}
                  onChange={e =>
                    setEmailNotifications(n => ({ ...n, sshKeyChanges: e.target.checked }))
                  }
                />
                Email me about SSH key changes
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={emailNotifications.groupRoleChanges}
                  onChange={e =>
                    setEmailNotifications(n => ({ ...n, groupRoleChanges: e.target.checked }))
                  }
                />
                Email me about group role changes
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={emailNotifications.organizationRoleChanges}
                  onChange={e =>
                    setEmailNotifications(n => ({ ...n, organizationRoleChanges: e.target.checked }))
                  }
                />
                Email me about organization role changes
              </label>
              <Button
                variant="primary"
                type="submit"
                disabled={updatingOptIn}
                loading={updatingOptIn}
                style={{ minWidth: 80 }}
              >
                {updatingOptIn ? 'Saving...' : 'Save'}
              </Button>
              {updateOptInError && <div className="error">{updateOptInError.message}</div>}
            </EmailForm>
          </div>
          <h2>SSH keys</h2>
          <div className="content">
            <SshKeys me={data?.me || {}} loading={loading} handleRefetch={handleRefetch} />
            <AddSshKey me={data?.me || {}} />
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default SettingsPage;
