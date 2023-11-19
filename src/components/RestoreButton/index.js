import React from 'react';

import Button from 'components/Button';
import Prepare from 'components/RestoreButton/Prepare';


function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

/**
 * A button to restore a backup.
 */
const RestoreButton = ({ backup: { backupId, restore } }) => {
  if (!restore) return <Prepare backupId={backupId} />;

  if (restore.status === 'pending') return <Button disabled>Retrieving ...</Button>;

  if (restore.status === 'failed') return <Button disabled>Retrieve failed</Button>;

  return <Button href={restore.restoreLocation}>Download ({humanFileSize(restore.restoreSize)})</Button>;
};

export default RestoreButton;
