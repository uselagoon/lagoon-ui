import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';
import Backups, { BackupsProps } from './index';

const meta: Meta<typeof Backups> = {
  component: Backups,
  title: 'Components/Backups',
  decorators: [withButtonOverrides('.download', 'click', 'Backups button click')],
};

faker.seed(123);
const backupsData = [
  {
    id: faker.string.uuid(),
    source: 'mariadb',
    created: '2019-11-18T08:00:00',
    backupId: '40',
    restore: {
      status: 'completed',
      restoreLocation: 'https://example.com/backup',
      restoreSize: 300,
    },
  },
  {
    id: faker.string.uuid(),
    source: 'mariadb',
    created: '2019-11-19T08:00:00',
    backupId: '41',
    restore: {
      status: 'failed',
    },
  },
  {
    id: faker.string.uuid(),
    source: 'mariadb',
    created: '2019-11-19T09:00:00',
    backupId: '42',
    restore: {
      status: 'pending',
    },
  },
] satisfies BackupsProps['backups'];

export const Default = () => <Backups backups={backupsData} id={''} />;

export const NoBackups = () => <Backups backups={[]} id={''} />;

export default meta;
