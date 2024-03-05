import React from 'react';

import { notification } from 'antd';
import Button from 'components/Button';

export const NewEnvButton = ({ action, loading, error, disabled, data }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = errorMessage => {
    api['error']({
      message: 'There was a problem creating an Environment.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };
  return (
    <>
      {contextHolder}
      <Button action={action} loading={loading} disabled={disabled} variant="primary">
        {loading ? 'Creating' : 'Create'}
      </Button>
      {error && openNotificationWithIcon(data.deployEnvironmentBranch)}
    </>
  );
};

const NewEnvironmentButton = ({
  deployEnvironmentBranch,
  inputBranchName,
  inputProjectName,
  loading,
  error,
  disabled,
  data,
}) => (
  <NewEnvButton
    action={() => {
      deployEnvironmentBranch({
        variables: {
          branch: inputBranchName,
          project: inputProjectName,
        },
      });
    }}
    loading={loading}
    error={error}
    disabled={disabled}
    data={data}
  />
);

export default NewEnvironmentButton;
