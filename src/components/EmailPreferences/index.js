import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import { EmailForm, StyledEmailPreferences } from 'components/EmailPreferences/StyledEmailPreferences';
import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $sshKeyChanges: Boolean!
    $groupRoleChanges: Boolean!
    $organizationRoleChanges: Boolean!
  ) {
    updateUser(
      input: {
        user: { email: $email }
        patch: {
          emailNotifications: {
            sshKeyChanges: $sshKeyChanges
            groupRoleChanges: $groupRoleChanges
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

const EmailPreferences = ({ me: { email, emailNotifications: notifications }, loading, handleRefetch }) => {
  const [emailNotifications, setEmailNotifications] = useState({
    sshKeyChanges: notifications?.sshKeyChanges ?? false,
    groupRoleChanges: notifications?.groupRoleChanges ?? false,
    organizationRoleChanges: notifications?.organizationRoleChanges ?? false,
  });

  const [updateUser, { loading: updatingOptIn, error: updateOptInError }] = useMutation(UPDATE_USER, {
    variables: {
      email: email,
      sshKeyChanges: emailNotifications?.sshKeyChanges,
      groupRoleChanges: emailNotifications?.groupRoleChanges,
      organizationRoleChanges: emailNotifications?.organizationRoleChanges,
    },
    onCompleted: data => {
      setEmailNotifications({
        sshKeyChanges: data?.updateUser?.emailNotifications?.sshKeyChanges,
        groupRoleChanges: data?.updateUser?.emailNotifications?.groupRoleChanges,
        organizationRoleChanges: data?.updateUser?.emailNotifications?.organizationRoleChanges,
      });
      handleRefetch();
    },
    onError: error => {
      console.error('Update error:', error);
    },
  });

  // Sync state when data loads
  useEffect(() => {
    if (emailNotifications) {
      setEmailNotifications({
        sshKeyChanges: notifications?.sshKeyChanges,
        groupRoleChanges: notifications?.groupRoleChanges,
        organizationRoleChanges: notifications?.organizationRoleChanges,
      });
    }
  }, [notifications?.groupRoleChanges, notifications?.organizationRoleChanges, notifications?.sshKeyChanges]);

  const handleUpdateUser = e => {
    e.preventDefault();
    updateUser();
  };

  const notificationOptions = [
    {
      key: 'sshKeyChanges',
      title: 'SSH Key Changes',
      description: 'Receive email notifications when your SSH keys are changed',
    },
    {
      key: 'groupRoleChanges',
      title: 'Group Role Changes',
      description: 'Receive email notifications when your group role is changed',
    },
    {
      key: 'organizationRoleChanges',
      title: 'Organization Role Changes',
      description: 'Receive email notifications when your organization role is changed',
    },
  ];

  return (
    <StyledEmailPreferences>
      <h2>Email Preferences</h2>
      {loading ? (
        <Skeleton count={2} height={100} />
      ) : (
        <EmailForm onSubmit={handleUpdateUser}>
          <div className="columns">
            {notificationOptions.map(option => (
              <label className="option" key={option.key}>
                <input
                  type="checkbox"
                  checked={!!emailNotifications[option.key]}
                  onChange={e => setEmailNotifications(n => ({ ...n, [option.key]: e.target.checked }))}
                />
                <div className="option-content">
                  <span className="option-title">{option.title}</span>
                  <span className="option-description">{option.description}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="button-container">
            <Button variant="primary" type="submit" disabled={updatingOptIn} loading={updatingOptIn}>
              {updatingOptIn ? 'Saving...' : 'Update Preferences'}
            </Button>
          </div>
          {updateOptInError && <div className="error">{updateOptInError.message}</div>}
        </EmailForm>
      )}
      <hr />
    </StyledEmailPreferences>
  );
};

export default EmailPreferences;
