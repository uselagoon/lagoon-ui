import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useTranslation from 'lib/useTranslation';

import { BackupsHeader, DataTable } from './StyledBackups';

const Backups = () => {
  const t = useTranslation();

  const numberOfBackupFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const backupFieldSkeleton = (
    <div className="data-row">
      <div className="source">
        <Skeleton />
      </div>
      <div className="created">
        <Skeleton />
      </div>

      <div className="backupid">
        <Skeleton />
      </div>
      <div className="download">
        <Skeleton />
      </div>
    </div>
  );

  return (
    <div className="backups">
      <BackupsHeader>
        <label className="source">{t('backups.label.source')}</label>
        <label className="created">{t('backups.label.created')}</label>
        <label className="backupid">{t('backups.label.backupID')}</label>
      </BackupsHeader>

      <DataTable>{[...Array<undefined>(numberOfBackupFields)].map(() => backupFieldSkeleton)}</DataTable>
    </div>
  );
};

export default Backups;
