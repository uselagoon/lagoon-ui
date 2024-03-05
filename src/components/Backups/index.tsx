import React, { FC } from 'react';

import RestoreButton from 'components/RestoreButton';
import moment from 'moment';

import { BackupsHeader, DataTable } from './StyledBackups';

export interface BackupsProps {
  backups: {
    source: string;
    id: string;
    created: string;
    backupId: string;
    restore: {
      status: 'completed' | 'pending' | 'failed';
      restoreLocation?: string;
      restoreSize?: number;
    };
  }[];
}

const Backups: FC<BackupsProps> = ({ backups }) => (
  <div className="backups" data-cy="backups">
    <BackupsHeader>
      <label className="source">Source</label>
      <label className="created">Created</label>
      <label className="backupid">Backup id</label>
    </BackupsHeader>

    <DataTable>
      {!backups.length && <div className="data-none">No Backups</div>}
      {backups.map(backup => (
        <div className="data-row" data-cy="backup-row" key={backup.id}>
          <div className="source">{backup.source}</div>
          <div className="created">{moment.utc(backup.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>

          <div className="backupid">{backup.backupId}</div>
          <div className="download" data-cy="backup-download">
            <RestoreButton backup={backup} />
          </div>
        </div>
      ))}
    </DataTable>
  </div>
);

export default Backups;
