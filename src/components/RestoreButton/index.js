import React from 'react';

import Button from 'components/Button';
import Prepare from 'components/RestoreButton/Prepare';

function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const formatted = (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];

  return [formatted.length > 5, formatted];
}

/**
 * A button to restore a backup.
 */
const RestoreButton = ({ backup: { backupId, restore } }) => {
  if (!restore) return <Prepare backupId={backupId} />;

  if (restore.status === 'pending') return <Button disabled>Retrieving ...</Button>;

  if (restore.status === 'failed') return <Button disabled>Retrieve failed</Button>;

  const [isOverflowing, formattedSize] = humanFileSize(restore.restoreSize);

  return (
    <Button variant={`download ${isOverflowing ? 'btn-download-lg' : ''}`} href={restore.restoreLocation}>
      Download ({formattedSize})
    </Button>
  );
};

export default RestoreButton;
