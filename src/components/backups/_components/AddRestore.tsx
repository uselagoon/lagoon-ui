import { Fragment } from 'react';

import { Backup } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/backups/page';
import addRestore from '@/lib/mutation/addRestore';
import { CloudDownloadOutlined, RedoOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { useNotification } from '@uselagoon/ui-library';

interface AddRestoreButtonProps {
  action: () => Promise<any>;
  success: boolean;
  loading: boolean;
  error?: {
    message: string;
  };
  type: 'failed' | 'unavailable';
}
export const AddRestoreButton = ({ action, success, loading, error, type }: AddRestoreButtonProps) => {
  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem retrieving backup.',
    content: error?.message,
    placement: 'top',
    duration: 0,
  });

  return (
    <>
      <Fragment>{contextHolder}</Fragment>

      {type === 'failed' ? (
        <RedoOutlined onClick={action} disabled={loading || success} />
      ) : (
        <CloudDownloadOutlined onClick={action} disabled={loading || success} />
      )}

      {error && trigger()}
    </>
  );
};

const AddRestore = ({ backup, type }: { backup: Backup; type: 'failed' | 'unavailable' }) => {
  const [addRestoreMutation, { data, loading, error }] = useMutation(addRestore, {
    onError: err => {
      console.error(err);
    },
    variables: {
      input: {
        backupId: backup.backupId,
      },
    },
    refetchQueries: ['getEnvironment'],
  });

  return (
    <AddRestoreButton
      action={addRestoreMutation}
      success={data && data.addRestore}
      loading={loading}
      error={error}
      type={type}
    />
  );
};

export default AddRestore;
