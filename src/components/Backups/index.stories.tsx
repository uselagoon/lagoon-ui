import { faker } from '@faker-js/faker';
import React from 'react';

import Backups, { BackupsProps } from './index';

export default {
  component: Backups,
  title: 'Components/Backups',
};

const backupsData = [
  {
    id:faker.string.uuid(),
    source: 'mariadb',
    created: '2019-11-18T08:00:00',
    backupId: '40',
    restore: {
      status: 'completed',
      restoreLocation: 'https://example.com/backup',
    },
  },
  {
    id:faker.string.uuid(),
    source: 'mariadb',
    created: '2019-11-19T08:00:00',
    backupId: '41',
    restore: {
      status: 'failed',
    },
  },
  {
    id:faker.string.uuid(),
    source: 'mariadb',
    created: '2019-11-19T09:00:00',
    backupId: '42',
    restore: {
      status: 'pending',
    },
  },
] satisfies BackupsProps["backups"];

export const Default = () => <Backups backups={backupsData} />;

export const NoBackups = () => <Backups backups={[]} />;
