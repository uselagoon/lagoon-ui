import React, { FC } from 'react';

import RestoreButton from 'components/RestoreButton';
import useTranslation from 'lib/useTranslation';
import moment from 'moment';

import { BackupsHeader, DataTable } from './StyledBackups';

interface BackupsProps {
  backups: {
    source: string;
    id: string;
    created: string;
    backupId: string;
    restore: {
      status: 'completed' | 'pending' | 'failed';
      restoreLocation: string;
    };
  }[];
}

const Backups: FC<BackupsProps> = ({ backups }) => {
  const t = useTranslation();

  return (
    <div className="backups">
      <BackupsHeader>
        <label className="source">{t('backups.label.source')}</label>
        <label className="created">{t('backups.label.created')}</label>
        <label className="backupid">{t('backups.label.backupID')}</label>
      </BackupsHeader>

      <DataTable>
        {!backups.length && <div className="data-none">{t('backups.noBackups')}</div>}
        {backups.map(backup => (
          <div className="data-row" key={backup.id}>
            <div className="source">{backup.source}</div>
            <div className="created">{moment.utc(backup.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>

            <div className="backupid">{backup.backupId}</div>
            <div className="download">
              <RestoreButton backup={backup} />
            </div>
          </div>
        ))}
      </DataTable>
    </div>
  );
};

export default Backups;
