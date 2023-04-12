import React from 'react';
import Button from 'components/Button';
import Prepare from 'components/RestoreButton/Prepare';
import useTranslation from 'lib/useTranslation';

/**
 * A button to restore a backup.
 */
const RestoreButton = ({ backup: { backupId, restore } }) => {
  const t = useTranslation();

  if (!restore)
    return <Prepare backupId={backupId} />;

  if (restore.status === 'pending')
    return <Button disabled>{t("backups.restore.retrieving")}</Button>;

  if (restore.status === 'failed')
    return <Button disabled>{t("backups.restore.retrieveFailed")}</Button>;

  return <Button href={restore.restoreLocation}>{t("backups.restore.download")}</Button>;
};

export default RestoreButton;
