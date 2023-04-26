import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { BackupsHeader, DataTable } from './StyledBackups';

const Backups = () => {
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
        <label className="source">Source</label>
        <label className="created">Created</label>
        <label className="backupid">Backup id</label>
      </BackupsHeader>

      <DataTable>{[...Array<undefined>(numberOfBackupFields)].map(() => backupFieldSkeleton)}</DataTable>
    </div>
  );
};

export default Backups;
