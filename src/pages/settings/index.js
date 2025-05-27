import React from 'react';

import Head from 'next/head';

import { useQuery, useMutation } from '@apollo/react-hooks';
import MainLayout from 'layouts/MainLayout';
import Me from 'lib/query/Me';
import gql from 'graphql-tag';
import SshKeys from '../../components/SshKeys';
import AddSshKey from '../../components/SshKeys/AddSshKey';
import QueryError from '../../components/errors/QueryError';
import { CommonWrapper } from '../../styles/commonPageStyles';
import Button from 'components/Button';


const UPDATE_USER = gql`
  mutation updateUser($email: String!, $emailOptIn: Boolean!) {
    updateUser(
      input: {
        user: { email: $email }
        patch: { emailOptIn: $emailOptIn }
      }
    ) {
      email
      emailOptIn
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

  const handleRefetch = async () => await refetch(queryVars);

  if (error) {
    return <QueryError error={error} />;
  }



  const [emailOptIn, setEmailOptIn] = React.useState(data?.me?.emailOptIn ?? false);
  const [updateUser, { loading: updatingOptIn, error: updateOptInError }] = useMutation(UPDATE_USER);

  // Sync state when data loads
  React.useEffect(() => {
    if (data?.me?.emailOptIn !== undefined) setEmailOptIn(data.me.emailOptIn);
  }, [data?.me?.emailOptIn]);

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2>Email Preferences</h2>
          <div className="content" style={{ minHeight: 0 }} >
          <form
            onSubmit={async e => {
              e.preventDefault();
              await updateUser({
                variables: {
                  email: data?.me?.email,
                  emailOptIn,
                },
              });
              handleRefetch();
            }}
            style={{
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '1rem', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={emailOptIn}
                onChange={e => setEmailOptIn(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Receive email notifications
            </label>
            <Button
              variant="primary"
              type="submit"
              disabled={updatingOptIn}
              style={{ minWidth: 80 }}
            >
              {updatingOptIn ? 'Saving...' : 'Save'}
            </Button>
            {updateOptInError && (
              <div style={{ color: 'red', marginLeft: '1rem' }}>{updateOptInError.message}</div>
            )}
          </form>
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
